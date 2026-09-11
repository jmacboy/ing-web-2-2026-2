const db = require("../models");

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
}
module.exports = authService;
