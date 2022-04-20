module.exports = (sequelize, DataTypes) => {
    const roles = sequelize.define('roles', {
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
        description: {
            type: DataTypes.STRING
        },
        permissions: {
            type: DataTypes.JSON,
            allowNull: false
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'modified_at'
    })

    return roles;
}