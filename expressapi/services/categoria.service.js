const db = require("../models");

module.exports = {
    getObjectList: async () => db.categoria.findAll(),
    createObject: async ({ nombre }) => db.categoria.create({ nombre }),
    getById: async (id) => db.categoria.findByPk(id),
    hasProducts: async (id) => (await db.producto.count({ where: { categoriaId: id } })) > 0,
    updateObject: async (id, { nombre }) => db.categoria.update({ nombre }, { where: { id } }),
    deleteObject: async (id) => db.categoria.destroy({ where: { id } }),
};
