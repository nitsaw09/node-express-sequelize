module.exports = (sequelize, DataTypes) => {
    const tags = sequelize.define('tags', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
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

    return tags;
}