const checkUserMiddleware = require("../middlewares/checkuser.middleware.js");
const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const schemaValidate = require("../middlewares/schemaValidate.middleware.js");
const mascotaSchema = require("../schemas/mascotaSchema.js");
const mascotaService = require("../services/mascota.service.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/mascota.controller.js");
    router.get("/", controller.getMascotasList);
    router.get("/create", controller.getMascotaCreate);
    router.post("/create", schemaValidate(mascotaSchema, '/mascotas/create'), controller.postMascotaCreate);
    router.get("/:id", getObjectOr404(mascotaService), controller.getMascotaUpdate);
    router.post("/:id", getObjectOr404(mascotaService), schemaValidate(mascotaSchema, '/mascotas/:id'), controller.postMascotaUpdate);
    router.post("/:id/delete", getObjectOr404(mascotaService), controller.getMascotaDelete);

    app.use('/mascotas', checkUserMiddleware, router);
};
