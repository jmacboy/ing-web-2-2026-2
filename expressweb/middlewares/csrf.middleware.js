const { doubleCsrf } = require("csrf-csrf");

const csrfSecret = process.env.CSRF_SECRET || process.env.SESSION_SECRET;

if (!csrfSecret) {
    throw new Error("CSRF_SECRET or SESSION_SECRET must be configured");
}

const {
    doubleCsrfProtection,
    generateCsrfToken
} = doubleCsrf({
    getSecret: () => csrfSecret,
    getSessionIdentifier: (req) => req.session.id,
    getCsrfTokenFromRequest: (req) => req.body?._csrf || req.headers["x-csrf-token"],
    cookieName: "csrf-token",
    cookieOptions: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    }
});

module.exports = { doubleCsrfProtection, generateCsrfToken };
