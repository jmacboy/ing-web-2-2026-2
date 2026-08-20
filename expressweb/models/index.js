const { sequelize } = require("../config/db.config");

const persona = require("./persona.model")(sequelize);

module.exports = {
    persona,
    sequelize,
    Sequelize: sequelize.Sequelize
}