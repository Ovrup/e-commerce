const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env

const verifyUser = (req, res, next) => {
    const token = req.headers['auth-token'];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        })
    }
    const user = jwt.verify(token, SECRET_KEY);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found. Invalid token'
        });
    }

    req.user = user;
    next();
}

module.exports = { verifyUser }