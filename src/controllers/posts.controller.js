const db = require('../models');

const {
    users: Users,
    posts: Posts,
    tags: Tags,
    categories: Categories,
    comments: Comments,
    postTag: PostTag
} = db;

exports.getPosts = (req, res, next) => {
    Posts
        .findAll({
            attributes: [['id', 'postId'], 'title', 'description', 'created_at'],
            include: [
                {
                    model: Tags,
                    attributes: [['id', 'tagId'], 'name']
                },
                {
                    model: Categories,
                    attributes: [['id', 'categoryId'], 'name'],
                    as: 'postCategory'
                },
                {
                    model: Users,
                    attributes: [['id', 'userId'], 'name'],
                    as: 'postCreator'
                }
            ]
        })
        .then(data => {
            res.status(200).json({ data });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

exports.findPost = (req, res, next) => {
    const { postId } = req.params;

    Posts
        .findByPk(postId, {
            attributes: [['id', 'postId'], 'title', 'description', 'created_at'],
            include: [
                {
                    model: Tags,
                    attributes: [['id', 'tagId'], 'name']
                },
                {
                    model: Categories,
                    attributes: [['id', 'categoryId'], 'name'],
                    as: 'postCategory'
                },
                {
                    model: Users,
                    attributes: [['id', 'userId'], 'name'],
                    as: 'postCreator'
                },
                {
                    model: Comments,
                    attributes: [['id', 'commentId'], 'comment'],
                    as: 'comments'
                }
            ]
        })
        .then(data => {
            res.status(200).json({ data });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

exports.createPost = (req, res, next) => {
    const { title, description, categoryId, userId: createdBy, tags } = req.body; 
    const data = { title, description, categoryId, createdBy };
    
    Posts.create(data)
        .then(data => {
            const insertPostTag = [];
            tags.forEach(tag => {
                if (tag.action === 'add') {
                    insertPostTag.push({ postId: data.id, tagId: tag.id });
                }
            });
            PostTag.bulkCreate(insertPostTag);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

exports.updatePost = (req, res, next) => {
    const { postId } = req.params
    const { title, description, categoryId, userId: createdBy, tags } = req.body; 
    const data = { title, description, categoryId, createdBy };
    
    Posts.update(data, {
        where: postId
    })
    .then(data => {
        const insertPostTag = [];
        const deleteTags = [];
        tags.forEach(tag => {
            if (tag.action === 'ADD') {
                insertPostTag.push({ postId: data.id, tagId: tag.id });
            } else if (tag.action === 'REMOVE') {
                deleteTags.push(tag.id);
            }
        });
        PostTag.bulkCreate(insertPostTag, {
            updateOnDuplicate: ["tagId"]
        });
        PostTag.destroy({
            where: {
                postId: postId,
                tagId: {
                    [Op.in]: deleteTags
                } 
            }
        })
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
}

exports.deletePost = (req, res, next) => {
    const { postId } = req.params;

    Posts.destroy({
        where: {
           id: postId
        }
    })
    .then(result => {
        if(result === 1) {
            PostTag.destroy({ where: { postId } });
            res.status(200).json({ message: "Post deleted successfully" });   
        }
        else {
            res.status(404).json({message:"Post not found"})
        }
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
}