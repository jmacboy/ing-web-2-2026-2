const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    return sequelize.define("categorias", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
