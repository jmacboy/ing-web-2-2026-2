module.exports = {
    generateToken: (payload) => {
        const jwt = require('jsonwebtoken');
        // eslint-disable-next-line no-undef
        const secretKey = process.env.JWT_SECRET;
        console.log(secretKey);
        const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });
        return token;
    },
    verifyToken: (token) => {
        const jwt = require('jsonwebtoken');
        // eslint-disable-next-line no-undef
        const secretKey = process.env.JWT_SECRET;
        try {
            const decoded = jwt.verify(token, secretKey);
            return decoded;
        } catch (err) {
            console.error('Token verification failed:', err);
            return null;
        }
    }
}