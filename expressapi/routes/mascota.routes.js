const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const schemaValidate = require("../middlewares/schemaValidate.middleware.js");
const userLoggedInMiddleware = require("../middlewares/userLoggedIn.middleware.js");
const { mascotaSchema, mascotaPatchSchema } = require("../schemas/mascotaSchema.js");
const mascotaService = require("../services/mascota.service.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/mascota.controller.js");
    router.get("/", userLoggedInMiddleware, controller.getMascotasList);
    router.get("/:id", userLoggedInMiddleware, getObjectOr404(mascotaService), controller.getMascotaById);
    router.post("/", userLoggedInMiddleware, schemaValidate(mascotaSchema), controller.postMascotaCreate);
    router.put("/:id", userLoggedInMiddleware, getObjectOr404(mascotaService), schemaValidate(mascotaSchema), controller.putMascotaUpdate);
    router.patch("/:id", userLoggedInMiddleware, getObjectOr404(mascotaService), schemaValidate(mascotaPatchSchema), controller.patchMascotaUpdate);
    router.delete("/:id", userLoggedInMiddleware, getObjectOr404(mascotaService), controller.deleteMascota);
    app.use('/mascotas', router);
};
