exports.getHome = (req, res) => {
    res.send('Hello World!')
}
exports.getHelloWorld = (req, res) => {
    res.render("home/holamundo", { name: "Juan Perez" });
}
exports.getForm = (req, res) => {
    res.render("home/form");
}
exports.postForm = (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const nombre2 = req.body.nombre2;
    const apellido2 = req.body.apellido2;

    res.render("home/formsubmit", { nombre, apellido, nombre2, apellido2 });
}
