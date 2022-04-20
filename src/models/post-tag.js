module.exports = (sequelize, DataTypes) => {
    const postTag = sequelize.define('post_tag', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        postId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        tagId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.UUID,
            allowNull: false
        },
        modifiedBy: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        timestamps: false
    })

    return postTag;
}