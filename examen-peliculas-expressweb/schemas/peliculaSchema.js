const { default: z } = require("zod");

const peliculaSchema = z.object({
    titulo: z.string("Título es obligatorio").min(1, "Título es obligatorio"),
    anio: z.string("Año es obligatorio").min(1, "Año es obligatorio"),
    rating: z.string("Rating es obligatorio").min(1, "Rating es obligatorio"),
    generoId: z.string("Género es obligatorio").min(1, "Género es obligatorio"),
});
module.exports = peliculaSchema;