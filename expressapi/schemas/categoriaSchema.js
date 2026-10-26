const { default: z } = require("zod");

const categoriaSchema = z.object({
    nombre: z.string("Nombre es obligatorio").min(1, "Nombre es obligatorio"),
});
const categoriaPatchSchema = z.object({
    nombre: z.string("Nombre es obligatorio").min(1, "Nombre es obligatorio").optional(),
});

module.exports = { categoriaSchema, categoriaPatchSchema };
