const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Persona = sequelize.define(
        'personas',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            apellido: {
                type: DataTypes.STRING,
            },
            edad: {
                type: DataTypes.INTEGER,
            },
            ciudad: {
                type: DataTypes.STRING,
            },
            fechaNacimiento: {
                type: DataTypes.DATE,
            }
        },
    );
    return Persona;
}