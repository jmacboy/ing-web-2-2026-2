const { sequelize } = require("../config/db.config");

const persona = require("./persona.model")(sequelize);
const mascota = require("./mascota.model")(sequelize);

mascota.belongsTo(persona);

module.exports = {
    persona,
    mascota,
    sequelize,
    Sequelize: sequelize.Sequelize
}