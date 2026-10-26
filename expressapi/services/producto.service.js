const db = require("../models");

module.exports = {
    getObjectList: async () => db.producto.findAll({ include: [{ model: db.categoria, as: "categoria" }] }),
    createObject: async ({ nombre, precio, stock, categoriaId }) => db.producto.create({ nombre, precio, stock, categoriaId }),
    getById: async (id) => db.producto.findByPk(id, { include: [{ model: db.categoria, as: "categoria" }] }),
    updateObject: async (id, { nombre, precio, stock, categoriaId }) => db.producto.update(
        { nombre, precio, stock, categoriaId }, { where: { id } }
    ),
    deleteObject: async (id) => db.producto.destroy({ where: { id } }),
};
