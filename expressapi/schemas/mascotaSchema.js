const { default: z } = require("zod");

const mascotaSchema = z.object({
    nombre: z.string("Nombre es obligatorio").min(1, "Nombre es obligatorio"),
    tipo: z.string("Tipo es obligatorio").min(1, "Tipo es obligatorio"),
    personaId: z.string("ID de la persona es obligatorio").min(1, "ID de la persona es obligatorio"),
});
module.exports = mascotaSchema;