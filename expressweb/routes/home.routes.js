
module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/home.controller.js");

    router.get("/", controller.getHome);
    router.get("/holamundo", controller.getHelloWorld);
    router.get("/form", controller.getForm);
    router.post("/formsubmit", controller.postForm);

    app.use('/', router);
};