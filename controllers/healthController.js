/**
 * Contrôleur pour les routes de santé et statut de l'API
 */

/**
 * Route pour vérifier que l'API est en vie
 * GET /api/alive
 */
const getAlive = (req, res) => {
    try {
        const response = {
            success: true,
            message: 'API en ligne',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: process.env.npm_package_version || '1.0.0',
            environment: process.env.NODE_ENV || 'development'
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la vérification du statut',
            error: error.message
        });
    }
};

/**
 * Route pour vérifier la santé complète de l'API
 * GET /api/health
 */
const getHealth = (req, res) => {
    try {
        const health = {
            success: true,
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: {
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
                total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
            },
            version: process.env.npm_package_version || '1.0.0',
            environment: process.env.NODE_ENV || 'development'
        };

        res.status(200).json(health);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la vérification de la santé',
            error: error.message
        });
    }
};

/**
 * Route pour obtenir des informations sur l'API
 * GET /api/info
 */
const getInfo = (req, res) => {
    try {
        const info = {
            success: true,
            name: 'NoSQL Graph API',
            description: 'API pour la gestion de graphes NoSQL',
            version: process.env.npm_package_version || '1.0.0',
            author: 'Votre nom',
            endpoints: {
                health: '/api/health',
                alive: '/api/alive',
                info: '/api/info'
            },
            timestamp: new Date().toISOString()
        };

        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des informations',
            error: error.message
        });
    }
};

module.exports = {
    getAlive,
    getHealth,
    getInfo
};
