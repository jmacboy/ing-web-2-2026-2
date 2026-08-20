module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    app.get("/holamundo", (req, res) => {
        res.render("home/holamundo", { name: "Juan Perez" });
    });
    app.get("/form", (req, res) => {
        res.render("home/form");
    });
    app.post("/formsubmit", (req, res) => {
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const nombre2 = req.body.nombre2;
        const apellido2 = req.body.apellido2;

        res.render("home/formsubmit", { nombre, apellido, nombre2, apellido2 });
    });
}