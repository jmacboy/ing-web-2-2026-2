module.exports = (app) => {
    require("./home.controller")(app);
    require("./persona.controller")(app);
    require("./mascota.controller")(app);
}