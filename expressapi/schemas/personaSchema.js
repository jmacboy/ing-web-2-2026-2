const { default: z } = require("zod");

const personaSchema = z.object({
    nombre: z.string("Nombre es obligatorio").min(1, "Nombre es obligatorio"),
    apellido: z.string("Apellido es obligatorio").min(1, "Apellido es obligatorio"),
    edad: z.number("Edad debería ser un numero").min(1, "Edad es obligatoria"),
    ciudad: z.string("Ciudad es obligatoria").min(1, "Ciudad es obligatoria"),
    fechaNacimiento: z.iso.date("Fecha de nacimiento es obligatoria"),
});
const personaPatchSchema = z.object({
    nombre: z.string("Nombre es obligatorio").min(1, "Nombre es obligatorio").optional(),
    apellido: z.string("Apellido es obligatorio").min(1, "Apellido es obligatorio").optional(),
    edad: z.number("Edad debería ser un numero").min(1, "Edad es obligatoria").optional(),
    ciudad: z.string("Ciudad es obligatoria").min(1, "Ciudad es obligatoria").optional(),
    fechaNacimiento: z.iso.date("Fecha de nacimiento es obligatoria").optional(),
});

module.exports = { personaSchema, personaPatchSchema };