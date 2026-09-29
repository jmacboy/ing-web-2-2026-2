const db = require("../models");

const generoService = {
    getObjectList: async () => {
        return await db.genero.findAll();
    },
    createObject: async ({
        nombre }) => {
        return await db.genero.create({
            nombre
        });
    },
    getById: async (id) => {
        return await db.genero.findByPk(id);
    },
    updateObject: async (id, {
        nombre }) => {
        return await db.genero.update({
            nombre
        }, {
            where: { id }
        });
    },
    deleteObject: async (id) => {
        return await db.genero.destroy({
            where: { id }
        });
    }

}
module.exports = generoService;
