/**
 * Contrôleur pour les routes de santé et statut de l'API
 */

/**
 * @swagger
 * /alive:
 *   get:
 *     summary: Vérifier que l'API est en vie
 *     description: Endpoint simple pour vérifier que l'API fonctionne
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API en ligne
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "API en ligne"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                 version:
 *                   type: string
 *                 environment:
 *                   type: string
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
 * @swagger
 * /health:
 *   get:
 *     summary: Vérifier la santé complète de l'API
 *     description: Endpoint détaillé pour vérifier la santé de l'API avec informations système
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Santé de l'API
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
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
 * @swagger
 * /info:
 *   get:
 *     summary: Obtenir des informations sur l'API
 *     description: Retourne les informations générales sur l'API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Informations sur l'API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 name:
 *                   type: string
 *                   example: "NoSQL Graph API"
 *                 description:
 *                   type: string
 *                 version:
 *                   type: string
 *                 author:
 *                   type: string
 *                 endpoints:
 *                   type: object
 *                 timestamp:
 *                   type: string
 *                   format: date-time
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
