module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define('comments', {
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
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        //timestamps: false
        createdAt: 'created_at',
        updatedAt: 'modified_at'
    })

    return comments;
}