const config = require('../config/config');

/**
 * Middleware CORS personnalisé
 * Configure les en-têtes CORS selon la configuration
 */
const corsMiddleware = (req, res, next) => {
    // Définir les en-têtes CORS
    res.header('Access-Control-Allow-Origin', config.cors.origin);
    res.header('Access-Control-Allow-Methods', config.cors.methods.join(', '));
    res.header('Access-Control-Allow-Headers', config.cors.allowedHeaders.join(', '));
    res.header('Access-Control-Allow-Credentials', 'true');

    // Gérer les requêtes OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    next();
};

/**
 * Middleware de logging des requêtes
 */
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
    next();
};

/**
 * Middleware de gestion d'erreurs global
 */
const errorHandler = (err, req, res, next) => {
    console.error('Erreur:', err);

    // Erreur de validation JWT
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Token JWT invalide'
        });
    }

    // Token expiré
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token JWT expiré'
        });
    }

    // Erreur par défaut
    res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

/**
 * Middleware pour les routes non trouvées
 */
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.path} non trouvée`
    });
};

module.exports = {
    corsMiddleware,
    requestLogger,
    errorHandler,
    notFound
};
