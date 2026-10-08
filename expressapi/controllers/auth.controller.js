const authService = require("../services/auth.service");
const { generateToken } = require("../utils/jwt.utils");
const { sha1Encode } = require("../utils/text.utils");

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = sha1Encode(password);
    const user = await authService.getByEmail(email);
    if (!user || user.password !== hashedPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken({
        id: user.id,
        email: user.email
    });
    res.json({ token });
}
exports.postRegister = async (req, res) => {
    const { email, password, fullname } = req.body;
    const hashedPassword = sha1Encode(password);
    await authService.register({
        email,
        password: hashedPassword,
        fullname
    });
    res.status(201).json({ message: "User registered successfully" });
}