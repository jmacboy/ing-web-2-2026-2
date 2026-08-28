module.exports = (app) => {
    require('./home.routes')(app);
    require('./persona.routes')(app);
    require('./mascota.routes')(app);
}