const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const schemaValidate = require("../middlewares/schemaValidate.middleware.js");
const userLoggedInMiddleware = require("../middlewares/userLoggedIn.middleware.js");
const { productoSchema, productoPatchSchema } = require("../schemas/productoSchema.js");
const service = require("../services/producto.service.js");

module.exports = (app) => {
    const router = require("express").Router();
    const controller = require("../controllers/producto.controller.js");
    router.get("/", userLoggedInMiddleware, controller.getProductosList);
    router.get("/:id", userLoggedInMiddleware, getObjectOr404(service), controller.getProductoById);
    router.post("/", userLoggedInMiddleware, schemaValidate(productoSchema), controller.postProductoCreate);
    router.put("/:id", userLoggedInMiddleware, getObjectOr404(service), schemaValidate(productoSchema), controller.putProductoUpdate);
    router.patch("/:id", userLoggedInMiddleware, getObjectOr404(service), schemaValidate(productoPatchSchema), controller.patchProductoUpdate);
    router.delete("/:id", userLoggedInMiddleware, getObjectOr404(service), controller.deleteProducto);
    app.use("/productos", router);
};
