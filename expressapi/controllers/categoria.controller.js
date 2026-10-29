const service = require("../services/categoria.service");

exports.getCategoriasList = async (req, res) => {
    const categorias = await service.getObjectList();
    res.json(categorias);
};
exports.getCategoriaById = async (req, res) => {
    const categoria = req.object;
    res.json(categoria);
};
exports.postCategoriaCreate = async (req, res) => {
    const categoriaBody = req.body;
    const categoria = await service.createObject(categoriaBody);
    res.status(201).json(categoria);
};
exports.putCategoriaUpdate = async (req, res) => {
    const categoria = req.object;
    const categoriaBody = req.body;
    await service.updateObject(categoria.id, categoriaBody);
    const updatedCategoria = await service.getById(categoria.id);
    res.json(updatedCategoria);
};
exports.patchCategoriaUpdate = async (req, res) => {
    const categoria = req.object;
    const categoriaBody = req.body;
    await service.updateObject(categoria.id, { ...categoria.get(), ...categoriaBody });
    const updatedCategoria = await service.getById(categoria.id);
    res.json(updatedCategoria);
};
exports.deleteCategoria = async (req, res) => {
    const categoria = req.object;
    const hasProducts = await service.hasProducts(categoria.id);
    if (hasProducts) {
        return res.status(409).json({ message: "Category has products and cannot be deleted" });
    }
    await service.deleteObject(categoria.id);
    res.json({ message: "Categoria deleted successfully" });
};
