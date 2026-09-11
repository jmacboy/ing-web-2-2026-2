const db = require("../models");

const mascotaService = {
    getObjectList: async () => {
        return await db.mascota.findAll({
            include: [db.persona]
        });
    },
    createObject: async ({ nombre,
        tipo,
        personaId
    }) => {
        return await db.mascota.create({
            nombre,
            tipo,
            personaId
        });
    },
    getById: async (id) => {
        return await db.mascota.findByPk(id);
    },
    updateObject: async (id, {
        nombre,
        tipo,
        personaId
    }) => {
        return await db.mascota.update({
            nombre,
            tipo,
            personaId
        }, {
            where: { id }
        });
    },
    deleteObject: async (id) => {
        return await db.mascota.destroy({
            where: { id }
        });
    }

}
module.exports = mascotaService;
