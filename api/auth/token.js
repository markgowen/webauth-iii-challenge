const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        sub: user.id,
        username: user.username,
        role: user.department
    };
    const options = {
        expiresIn: '2d'
    };
    return jwt.sign(payload, process.env.ENCRYPTION_KEY, options);
};

module.exports = {
    generateToken
};