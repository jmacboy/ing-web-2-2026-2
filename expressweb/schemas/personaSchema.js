const { default: z } = require("zod");

const personaSchema = z.object({
    nombre: z.string("Nombre es obligatorio").min(1, "Nombre es obligatorio"),
    apellido: z.string("Apellido es obligatorio").min(1, "Apellido es obligatorio"),
    edad: z.string("Edad es obligatoria").min(1, "Edad es obligatoria"),
    ciudad: z.string("Ciudad es obligatoria").min(1, "Ciudad es obligatoria"),
    fechaNacimiento: z.string("Fecha de nacimiento es obligatoria").min(1, "Fecha de nacimiento es obligatoria"),
});
module.exports = personaSchema;