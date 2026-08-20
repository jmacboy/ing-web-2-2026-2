const db = require("../models/");
module.exports = (app) => {
    app.get('/personas', (req, res) => {
        db.persona.findAll().then((personas) => {
            res.render("personas/list", { personas });
        });
    });
    app.get('/personas/create', (req, res) => {
        res.render("personas/form", { persona: null });
    });
    app.post('/personas/create', (req, res) => {
        const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
        db.persona.create({
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento
        }).then((persona) => {
            res.redirect("/personas");
        });
    });
    app.get('/personas/:id', (req, res) => {
        const { id } = req.params;
        db.persona.findByPk(id).then((persona) => {
            res.render("personas/form", { persona });
        });
    });
    app.post('/personas/:id', (req, res) => {
        const { id } = req.params;
        const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
        const persona = db.persona.findByPk(id);
        if (!persona) {
            res.redirect("/personas");
            return;
        }
        db.persona.update({
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento
        }, {
            where: { id }
        }).then(() => {
            res.redirect("/personas");
        });
    });
    app.post('/personas/:id/delete', (req, res) => {
        const { id } = req.params;
        const persona = db.persona.findByPk(id);
        if (!persona) {
            res.redirect("/personas");
            return;
        }
        db.persona.destroy({
            where: { id }
        }).then(() => {
            res.redirect("/personas");
        });
    });
}