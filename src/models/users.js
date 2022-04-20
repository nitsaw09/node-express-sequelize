module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: { isEmail: true },
            allowNull: false
        },
        roleId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM(['Male', 'Female', 'Other']),
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'modified_at'
    });

    return users;
}