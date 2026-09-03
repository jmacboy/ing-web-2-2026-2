const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const schemaValidate = require("../middlewares/schemaValidate.middleware.js");
const personaSchema = require("../schemas/personaSchema.js");
const personaService = require("../services/persona.service.js");
const { doubleCsrfProtection } = require("../middlewares/csrf.middleware.js");
const checkUserMiddleware = require("../middlewares/checkuser.middleware.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/persona.controller.js");
    router.get("/", checkUserMiddleware, controller.getPersonasList);
    router.get("/create", checkUserMiddleware, controller.getPersonaCreate);
    router.post("/create", checkUserMiddleware, doubleCsrfProtection, schemaValidate(personaSchema, '/personas/create'), controller.postPersonaCreate);
    router.get("/:id", checkUserMiddleware, getObjectOr404(personaService), controller.getPersonaUpdate);
    router.post("/:id", checkUserMiddleware, doubleCsrfProtection, getObjectOr404(personaService), schemaValidate(personaSchema, '/personas/:id'), controller.postPersonaUpdate);
    router.post("/:id/delete", checkUserMiddleware, getObjectOr404(personaService), controller.getPersonaDelete);

    app.use('/personas', router);
};
