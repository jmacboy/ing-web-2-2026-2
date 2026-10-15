const mascotaService = require("../services/mascota.service");

exports.getMascotasList = async (req, res) => {
    const mascotas = await mascotaService.getObjectList();
    res.json(mascotas);
}
exports.getMascotaById = async (req, res) => {
    res.json(req.object);
}
exports.postMascotaCreate = async (req, res) => {
    const { nombre, tipo, personaId } = req.body;

    const mascota = await mascotaService.createObject({
        nombre,
        tipo,
        personaId
    });
    res.status(201).json(mascota);
};
exports.putMascotaUpdate = async (req, res) => {

    const { nombre, tipo, personaId } = req.body;
    await mascotaService.updateObject(req.params.id, {
        nombre,
        tipo,
        personaId
    });
    const mascotaActualizada = await mascotaService.getById(req.params.id);
    res.json(mascotaActualizada);
};
exports.patchMascotaUpdate = async (req, res) => {
    let mascota = req.object;
    const body = req.body;
    mascota = { ...mascota, ...body };
    await mascotaService.updateObject(req.object.id, {
        nombre: mascota.nombre,
        tipo: mascota.tipo,
        personaId: mascota.personaId
    });
    const mascotaActualizada = await mascotaService.getById(req.object.id);
    res.json(mascotaActualizada);
};
exports.deleteMascota = async (req, res) => {
    console.log("Deleting mascota with ID:", req.object.id);
    await mascotaService.deleteObject(req.object.id);
    res.json({ message: "Mascota deleted successfully" });
};
