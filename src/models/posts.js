module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define('posts', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        categoryId: {
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
        createdAt: 'created_at',
        updatedAt: 'modified_at'
    })

    return posts;
}