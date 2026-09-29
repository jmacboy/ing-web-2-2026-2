const schemaValidate = require("../middlewares/schemaValidate.middleware.js");
const peliculaSchema = require("../schemas/peliculaSchema.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pelicula.controller.js");

    router.get("/", controller.getPeliculasList);
    router.get("/create", controller.getPeliculaCreate);
    router.post("/create", schemaValidate(peliculaSchema, '/peliculas/create'), controller.postPeliculaCreate);

    app.use('/peliculas', router);
};