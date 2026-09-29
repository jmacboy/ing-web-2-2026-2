const { sequelize } = require("../config/db.config");

const pelicula = require("./pelicula.model")(sequelize);
const genero = require("./genero.model")(sequelize);

pelicula.belongsTo(genero);

module.exports = {
    pelicula,
    genero,
    sequelize,
    Sequelize: sequelize.Sequelize
}