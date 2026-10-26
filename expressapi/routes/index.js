module.exports = (app) => {
    require('./persona.routes.js')(app);
    require('./mascota.routes.js')(app);
    require('./auth.routes.js')(app);
    require('./categoria.routes.js')(app);
    require('./producto.routes.js')(app);
}
