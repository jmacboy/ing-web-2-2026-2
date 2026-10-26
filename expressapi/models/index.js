const { sequelize } = require("../config/db.config");

const persona = require("./persona.model")(sequelize);
const mascota = require("./mascota.model")(sequelize);
const usuario = require("./user.model")(sequelize);
const categoria = require("./categoria.model")(sequelize);
const producto = require("./producto.model")(sequelize);

persona.hasMany(mascota, { foreignKey: "personaId" });
mascota.belongsTo(persona, { foreignKey: "personaId", as: "persona", onDelete: "CASCADE" });
categoria.hasMany(producto, { foreignKey: "categoriaId", onDelete: "RESTRICT" });
producto.belongsTo(categoria, { foreignKey: "categoriaId", as: "categoria", onDelete: "RESTRICT" });

module.exports = {
    persona,
    mascota,
    usuario,
    categoria,
    producto,
    sequelize,
    Sequelize: sequelize.Sequelize
}
