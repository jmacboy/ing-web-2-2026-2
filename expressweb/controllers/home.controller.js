const authService = require("../services/auth.service");
const { sha1Encode } = require("../utils/text.utils");

exports.getHome = (req, res) => {
    res.render("home/index", {});
}
exports.getHelloWorld = (req, res) => {
    res.render("home/holamundo", { name: "Juan Perez" });
}
exports.getForm = (req, res) => {
    res.render("home/form");
}
exports.postForm = (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const nombre2 = req.body.nombre2;
    const apellido2 = req.body.apellido2;

    res.render("home/formsubmit", { nombre, apellido, nombre2, apellido2 });
}

exports.getLogin = async (req, res) => {
    res.render("auth/loginform", {});
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = sha1Encode(password);
    const user = await authService.getByEmail(email);
    if (!user || user.password !== hashedPassword) {
        return res.render("auth/loginform", { error: "Usuario o contraseña incorrectos" });
    }
    req.session.userId = user.id;
    res.redirect("/");
};
exports.getLogout = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
}
exports.getRegister = async (req, res) => {
    res.render("auth/registerform", {});
}

exports.postRegister = async (req, res) => {
    const { email, password, fullname } = req.body;
    const hashedPassword = sha1Encode(password);
    await authService.register({
        email,
        password: hashedPassword,
        fullname
    });
    res.redirect("/login");
};