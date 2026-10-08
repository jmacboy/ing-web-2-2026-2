const db = require("../models");
const { generateRandomToken } = require("../utils/text.utils");

const authService = {
    register: async ({
        fullname,
        email,
        password
    }) => {
        return await db.usuario.create({
            fullname,
            email,
            password
        });
    },
    getByEmail: async (email) => {
        return await db.usuario.findOne({
            where: { email }
        });
    },
    generateToken: async (user) => {
        const token = generateRandomToken(32);
        return await db.tokenUsuario.create({
            token,
            userId: user.id
        });
    },
    getById: async (id) => {
        return await db.usuario.findByPk(id);
    },
}
module.exports = authService;
