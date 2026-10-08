module.exports = (app) => {
    require('./persona.routes.js')(app);
    require('./auth.routes.js')(app);
}