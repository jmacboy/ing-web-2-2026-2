const schemaValidate = require("../middlewares/schemaValidate.middleware.js");
const { registerSchema, loginSchema } = require("../schemas/authSchema.js");


module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/auth.controller.js");
    router.post("/login", schemaValidate(loginSchema), controller.postLogin);
    router.post("/register", schemaValidate(registerSchema), controller.postRegister);
    app.use('/auth', router);
};
