const { sequelize } = require("../config/db.config");

const persona = require("./persona.model")(sequelize);
const mascota = require("./mascota.model")(sequelize);
const usuario = require("./user.model")(sequelize);

persona.hasMany(mascota, { foreignKey: "personaId" });
mascota.belongsTo(persona, { foreignKey: "personaId", as: "persona", onDelete: "CASCADE" });

module.exports = {
    persona,
    mascota,
    usuario,
    sequelize,
    Sequelize: sequelize.Sequelize
}