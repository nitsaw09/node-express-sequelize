module.exports = (sequelize, DataTypes) => {
    const categories = sequelize.define('categories', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.UUID,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parentId: {
            type: DataTypes.UUID
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

    return categories;
}