const generoService = require("../services/genero.service");
const peliculaService = require("../services/pelicula.service");

exports.getPeliculasList = async (req, res) => {
    const { q, genero } = req.query;
    const generos = await generoService.getObjectList();
    if (q || genero) {
        const peliculas = await peliculaService.getSearch(q, genero);
        res.render("peliculas/list", { peliculas, search: q, genero: genero || "", generos });
    } else {
        const peliculas = await peliculaService.getObjectList();
        res.render("peliculas/list", { peliculas, search: "", genero: "", generos });
    }
}


exports.getPeliculaCreate = async (req, res) => {
    const generos = await generoService.getObjectList();
    res.render("peliculas/form", { model: null, generos });
}
exports.postPeliculaCreate = async (req, res) => {
    const { titulo, anio, rating, generoId } = req.body;
    if (rating < 0 || rating > 10) {
        const generos = await generoService.getObjectList();
        req.session.error = ["Rating debe estar entre 0 y 10"];
        res.render("peliculas/form", { model: req.body, generos });
        return;
    }
    await peliculaService.createObject({
        titulo,
        anio: anio,
        rating: rating,
        generoId: generoId
    });
    res.redirect("/peliculas");
};