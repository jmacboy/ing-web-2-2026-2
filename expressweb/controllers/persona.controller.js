const personaService = require("../services/persona.service");
const { generateCsrfToken } = require("../middlewares/csrf.middleware");

exports.getPersonasList = async (req, res) => {
    const personas = await personaService.getObjectList();
    coonsol
    res.render("personas/list", { personas });
}
exports.getPersonaCreate = (req, res) => {
    res.render("personas/form", { model: null, csrfToken: generateCsrfToken(req, res) });
}
exports.postPersonaCreate = async (req, res) => {
    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
    await personaService.createObject({
        nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento
    });
    res.redirect("/personas");
};
exports.getPersonaUpdate = (req, res) => {
    res.render("personas/form", { model: req.object, csrfToken: generateCsrfToken(req, res) });
};
exports.postPersonaUpdate = async (req, res) => {
    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;

    await personaService.updateObject(req.object.id, {
        nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento
    });
    res.redirect("/personas");
};
exports.getPersonaDelete = async (req, res) => {
    await personaService.deleteObject(req.object.id);
    res.redirect("/personas");
};
