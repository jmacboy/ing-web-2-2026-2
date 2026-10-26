const service = require("../services/producto.service");

exports.getProductosList = async (req, res) => res.json(await service.getObjectList());
exports.getProductoById = async (req, res) => res.json(req.object);
exports.postProductoCreate = async (req, res) => res.status(201).json(await service.createObject(req.body));
exports.putProductoUpdate = async (req, res) => {
    await service.updateObject(req.params.id, req.body);
    res.json(await service.getById(req.params.id));
};
exports.patchProductoUpdate = async (req, res) => {
    await service.updateObject(req.object.id, { ...req.object.get(), ...req.body });
    res.json(await service.getById(req.object.id));
};
exports.deleteProducto = async (req, res) => {
    await service.deleteObject(req.object.id);
    res.json({ message: "Producto deleted successfully" });
};
