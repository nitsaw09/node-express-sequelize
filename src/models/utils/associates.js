module.exports = ({ db }) => {
    // user & post associates one to many
    db.users.hasMany(db.posts, { as: 'posts', foreignKey: 'createdBy', sourceKey: 'id' });
    db.posts.belongsTo(db.users, { as: 'postCreator', foreignKey: 'createdBy', sourceKey: 'id' });
    db.posts.belongsTo(db.users, { as: 'postModifier', foreignKey: 'modifiedBy', sourceKey: 'id' });

    // user & roles associates one to many
    db.roles.hasMany(db.users, { as: 'users', foreignKey: 'roleId', sourceKey: 'id'});
    db.users.belongsTo(db.roles, { as: 'role', foreignKey: 'roleId', sourceKey: 'id' });

    // post and comment associates one to many
    db.posts.hasMany(db.comments, { as: 'comments', foreignKey: 'postId', sourceKey: 'id' });
    db.comments.belongsTo(db.posts, { as: 'post', foreignKey: 'postId', sourceKey: 'id' });

    // category and category associates one to many
    db.categories.hasMany(db.categories, { as: 'subCategories', foreignKey: 'postId', sourceKey: 'id' });
    db.categories.belongsTo(db.categories, { as: 'parentCategory', foreignKey: 'postId', sourceKey: 'id' });

    // category and posts associates one to many
    db.categories.hasMany(db.posts, { as: 'posts', foreignKey: 'categoryId', sourceKey: 'id' });
    db.posts.belongsTo(db.categories, { as: 'postCategory', foreignKey: 'categoryId', sourceKey: 'id' });

    // tags and post associates many to many
    db.posts.belongsToMany(db.tags, { through: 'post_tag' });
    db.tags.belongsToMany(db.posts, { through: 'post_tag' });
}