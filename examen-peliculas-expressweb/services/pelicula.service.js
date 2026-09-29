const db = require("../models");

const peliculaService = {
    getObjectList: async () => {
        return await db.pelicula.findAll({
            include: [{
                model: db.genero,
                as: "genero"
            }
            ]
        });
    },
    getSearch: async (search, generoId) => {
        const whereClause = {};
        if (search) {
            whereClause.titulo = {
                [db.Sequelize.Op.like]: `%${search}%`
            };
        }
        if (generoId) {
            whereClause.generoId = generoId;
        }
        return await db.pelicula.findAll({
            where: whereClause,
            include: [{
                model: db.genero,
                as: "genero"
            }]
        });
    },
    createObject: async ({
        titulo,
        anio,
        rating,
        generoId }) => {
        return await db.pelicula.create({
            titulo,
            anio,
            rating,
            generoId
        });
    },
    getById: async (id) => {
        return await db.pelicula.findByPk(id);
    },
    updateObject: async (id, {
        titulo,
        anio,
        rating,
        generoId }) => {
        return await db.pelicula.update({
            titulo,
            anio,
            rating,
            generoId
        }, {
            where: { id }
        });
    },
    deleteObject: async (id) => {
        return await db.pelicula.destroy({
            where: { id }
        });
    }

}
module.exports = peliculaService;
