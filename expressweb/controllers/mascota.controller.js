const mascotaService = require("../services/mascota.service");

exports.getMascotasList = async (req, res) => {
    const mascotas = await mascotaService.getObjectList();
    res.render("mascotas/list", { mascotas });
}

exports.getMascotaCreate = async (req, res) => {
    const personas = await personaService.getObjectList();
    res.render("mascotas/form", { model: null, personas, error: null });
}

exports.postMascotaCreate = async (req, res) => {
    const { nombre, tipo, personaId } = req.body;
    await mascotaService.createObject({
        nombre,
        tipo,
        personaId
    });
    res.redirect("/mascotas");
};

exports.getMascotaUpdate = async (req, res) => {
    const personas = await personaService.getObjectList();
    res.render("mascotas/form", { model: req.object, personas, error: null });
};

exports.postMascotaUpdate = async (req, res) => {
    const { nombre, tipo, personaId } = req.body;
    await mascotaService.updateObject(req.object.id, {
        nombre,
        tipo,
        personaId
    });
    res.redirect("/mascotas");
};

exports.getMascotaDelete = async (req, res) => {
    await mascotaService.deleteObject(req.object.id);
    res.redirect("/mascotas");
}
