const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Mascota = sequelize.define(
        'mascotas',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tipo: {
                type: DataTypes.ENUM('gato', 'perro', 'loro'),
                allowNull: false,
            },
            personaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
    );
    return Mascota;
}
