const db = require("../models");

const personaService = {
    getObjectList: async () => {
        return await db.persona.findAll();
    },
    createObject: async ({ nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento }) => {
        return await db.persona.create({
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento
        });
    },
    getById: async (id) => {
        return await db.persona.findByPk(id);
    },
    updateObject: async (id, { nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento }) => {
        return await db.persona.update({
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento
        }, {
            where: { id }
        });
    },
    deleteObject: async (id) => {
        return await db.persona.destroy({
            where: { id }
        });
    }

}
module.exports = personaService;
