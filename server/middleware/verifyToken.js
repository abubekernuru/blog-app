const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/error.js');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log('verifyToken cookies:', req.cookies);

    if (!token) {
        return next(errorHandler(401, 'You are not authenticated!'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('JWT verify error:', err);
            return next(errorHandler(403, 'Token is not valid!'));
        }
        req.user = user;
        console.log('req.user after verify:', req.user);
        next();
    });

}

module.exports = { verifyToken };