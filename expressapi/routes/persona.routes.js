const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const schemaValidate = require("../middlewares/schemaValidate.middleware.js");
const userLoggedInMiddleware = require("../middlewares/userLoggedIn.middleware.js");
const { personaSchema, personaPatchSchema } = require("../schemas/personaSchema.js");
const personaService = require("../services/persona.service.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/persona.controller.js");
    router.get("/", userLoggedInMiddleware, controller.getPersonasList);
    router.get("/:id", getObjectOr404(personaService), controller.getPersonaById);
    router.post("/", schemaValidate(personaSchema), controller.postPersonaCreate);
    router.post("/search", controller.postPersonasSearch);
    router.put("/:id", getObjectOr404(personaService), schemaValidate(personaSchema), controller.putPersonaUpdate);
    router.patch("/:id", getObjectOr404(personaService), schemaValidate(personaPatchSchema), controller.patchPersonaUpdate);
    router.delete("/:id", getObjectOr404(personaService), controller.deletePersona);
    app.use('/personas', router);
};
