const { default: z } = require("zod");

const loginSchema = z.object({
    email: z.string("email es obligatorio").email("Email no es válido"),
    password: z.string("password es obligatoria").min(6, "Contraseña debe tener al menos 6 caracteres"),
});
const registerSchema = z.object({
    email: z.string("email es obligatorio").email("Email no es válido"),
    password: z.string("password es obligatoria").min(6, "Contraseña debe tener al menos 6 caracteres"),
    fullname: z.string("fullname completo es obligatorio").min(1, "Nombre completo es obligatorio"),
});

module.exports = { loginSchema, registerSchema };