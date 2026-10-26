const service = require("../services/categoria.service");

exports.getCategoriasList = async (req, res) => res.json(await service.getObjectList());
exports.getCategoriaById = async (req, res) => res.json(req.object);
exports.postCategoriaCreate = async (req, res) => res.status(201).json(await service.createObject(req.body));
exports.putCategoriaUpdate = async (req, res) => {
    await service.updateObject(req.params.id, req.body);
    res.json(await service.getById(req.params.id));
};
exports.patchCategoriaUpdate = async (req, res) => {
    await service.updateObject(req.object.id, { ...req.object.get(), ...req.body });
    res.json(await service.getById(req.object.id));
};
exports.deleteCategoria = async (req, res) => {
    if (await service.hasProducts(req.object.id)) {
        return res.status(409).json({ message: "Category has products and cannot be deleted" });
    }
    await service.deleteObject(req.object.id);
    res.json({ message: "Categoria deleted successfully" });
};
