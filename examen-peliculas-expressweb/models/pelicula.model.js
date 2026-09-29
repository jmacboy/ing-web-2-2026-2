const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Pelicula = sequelize.define(
        'peliculas',
        {
            titulo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            anio: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            rating: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            generoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
    );
    return Pelicula;
}