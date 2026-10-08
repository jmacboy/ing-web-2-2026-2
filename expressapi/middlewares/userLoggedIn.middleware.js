const authService = require("../services/auth.service");
const { verifyToken } = require("../utils/jwt.utils");

const userLoggedInMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthenticated" });
    }
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthenticated" });
    }
    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) {
        return res.status(401).json({ message: "Unauthenticated" });
    }
    const user = await authService.getById(payload.id);
    if (!user) {
        return res.status(401).json({ message: "Unauthenticated" });
    }
    req.user = user;
    next();
}

module.exports = userLoggedInMiddleware;