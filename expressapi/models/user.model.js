const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Usuario = sequelize.define(
        'usuarios',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fullname: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
    );
    return Usuario;
}
