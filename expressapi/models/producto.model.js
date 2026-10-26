const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    return sequelize.define("productos", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categoriaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};
