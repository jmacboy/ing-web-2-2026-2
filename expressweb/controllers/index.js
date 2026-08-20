module.exports = (app) => {
    require("./home.controller")(app);
    require("./persona.controller")(app);
}