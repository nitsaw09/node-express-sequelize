const db = require('../models');
const {
    users: Users,
    posts: Posts,
    comments: Comments
} = db;

exports.createComment = async (req, res, next) => {
    const {  userId, postId, comment } = req.body;
    
    try {
        const userExist = await Users.findByPk(userId);
        const postExist = await Posts.findByPk(postId);

        if (userExist && postExist) {
            Comments.create({ userId, postId, comment })
            .then(result => {
                res.status(200).json({ result, message: 'comment created successfully' });
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
        } else {
            res.status(500).json({ error: 'User or Post does not exist' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateComment = (req, res, next) => {
    const { commentId } = req.params;
    const { comment } = req.body;

    Comments.update({ comment },
    {
        where: commentId
    })
    .then(result => {
        res.status(200).json({ result, message: 'comment updated successfully' });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
}

exports.deleteComment = (req, res, next) => {
    const { commentId } = req.params;

    Comments.destroy({
        where: {
           id: commentId
        }
    })
    .then(result => {
        if(result === 1){
            res.status(200).json({ message: "Comment deleted successfully" });          
        }
        else {
            res.status(404).json({message:"Comment not found"})
        }
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
}