const personaService = require("../services/persona.service");

exports.getPersonasList = async (req, res) => {
    const personas = await personaService.getObjectList();
    res.json(personas);
}
exports.getPersonaById = async (req, res) => {
    res.json(req.object);
}
exports.postPersonaCreate = async (req, res) => {
    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;

    const persona = await personaService.createObject({
        nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento
    });
    res.status(201).json(persona);
};
exports.putPersonaUpdate = async (req, res) => {

    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
    await personaService.updateObject(req.params.id, {
        nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento
    });
    const personaActualizada = await personaService.getById(req.params.id);
    res.json(personaActualizada);
};
exports.patchPersonaUpdate = async (req, res) => {
    let persona = req.object;
    const body = req.body;
    persona = { ...persona, ...body };
    await personaService.updateObject(req.object.id, {
        nombre: persona.nombre,
        apellido: persona.apellido,
        edad: persona.edad,
        ciudad: persona.ciudad,
        fechaNacimiento: persona.fechaNacimiento
    });
    const personaActualizada = await personaService.getById(req.object.id);
    res.json(personaActualizada);
};
exports.deletePersona = async (req, res) => {
    console.log("Deleting persona with ID:", req.object.id);
    await personaService.deleteObject(req.object.id);
    res.json({ message: "Persona deleted successfully" });
};
