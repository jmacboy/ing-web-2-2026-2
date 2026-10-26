const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const schemaValidate = require("../middlewares/schemaValidate.middleware.js");
const userLoggedInMiddleware = require("../middlewares/userLoggedIn.middleware.js");
const { categoriaSchema, categoriaPatchSchema } = require("../schemas/categoriaSchema.js");
const service = require("../services/categoria.service.js");

module.exports = (app) => {
    const router = require("express").Router();
    const controller = require("../controllers/categoria.controller.js");
    router.get("/", userLoggedInMiddleware, controller.getCategoriasList);
    router.get("/:id", userLoggedInMiddleware, getObjectOr404(service), controller.getCategoriaById);
    router.post("/", userLoggedInMiddleware, schemaValidate(categoriaSchema), controller.postCategoriaCreate);
    router.put("/:id", userLoggedInMiddleware, getObjectOr404(service), schemaValidate(categoriaSchema), controller.putCategoriaUpdate);
    router.patch("/:id", userLoggedInMiddleware, getObjectOr404(service), schemaValidate(categoriaPatchSchema), controller.patchCategoriaUpdate);
    router.delete("/:id", userLoggedInMiddleware, getObjectOr404(service), controller.deleteCategoria);
    app.use("/categorias", router);
};
