const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Middleware d'authentification JWT
 * Vérifie la présence et la validité du token JWT dans les headers
 */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Token d\'accès requis' 
        });
    }

    jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                success: false, 
                message: 'Token invalide ou expiré' 
            });
        }
        
        req.user = user;
        next();
    });
};

/**
 * Middleware optionnel pour l'authentification
 * Permet l'accès même sans token, mais ajoute les infos utilisateur si présent
 */
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        req.user = null;
        return next();
    }

    jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) {
            req.user = null;
        } else {
            req.user = user;
        }
        next();
    });
};

const generateToken = (payload) => {
    return jwt.sign(payload, config.jwt.secret, { 
        expiresIn: config.jwt.expiresIn 
    });
};

module.exports = {
    authenticateToken,
    optionalAuth,
    generateToken
};
