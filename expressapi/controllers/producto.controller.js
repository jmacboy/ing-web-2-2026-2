const service = require("../services/producto.service");

exports.getProductosList = async (req, res) => {
    const productos = await service.getObjectList();
    res.json(productos);
};
exports.getProductoById = async (req, res) => {
    const producto = req.object;
    res.json(producto);
};
exports.postProductoCreate = async (req, res) => {
    const productoBody = req.body;
    const producto = await service.createObject(productoBody);
    res.status(201).json(producto);
};
exports.putProductoUpdate = async (req, res) => {
    const producto = req.object;
    const productoBody = req.body;
    await service.updateObject(producto.id, productoBody);
    const updatedProducto = await service.getById(producto.id);
    res.json(updatedProducto);
};
exports.patchProductoUpdate = async (req, res) => {
    const producto = req.object;
    const productoBody = req.body;
    await service.updateObject(producto.id, { ...producto.get(), ...productoBody });
    const updatedProducto = await service.getById(producto.id);
    res.json(updatedProducto);
};
exports.deleteProducto = async (req, res) => {
    const producto = req.object;
    await service.deleteObject(producto.id);
    res.json({ message: "Producto deleted successfully" });
};
