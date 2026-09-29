const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Genero = sequelize.define(
        'generos',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
    );
    return Genero;
}