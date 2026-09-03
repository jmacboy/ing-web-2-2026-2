const checkUserMiddleware = require("../middlewares/checkuser.middleware.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/home.controller.js");

    router.get("/", checkUserMiddleware, controller.getHome);
    router.get("/logout", checkUserMiddleware, controller.getLogout);
    router.get("/login", controller.getLogin);
    router.post("/login", controller.postLogin);
    router.get("/register", controller.getRegister);
    router.post("/register", controller.postRegister);
    router.get("/holamundo", checkUserMiddleware, controller.getHelloWorld);
    router.get("/form", checkUserMiddleware, controller.getForm);
    router.post("/formsubmit", checkUserMiddleware, controller.postForm);

    app.use('/', router);
};