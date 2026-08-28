const getObjectOr404 = (service) => {
    return async (req, res, next) => {
        const { id } = req.params;
        const object = await service.getById(id);
        if (!object) {
            res.status(404).render("404");
            return;
        }
        req.object = object;
        next();
    }
}


module.exports = getObjectOr404;