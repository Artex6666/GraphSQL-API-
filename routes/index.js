const express = require('express');
const router = express.Router();

// Import des routeurs
const healthRoutes = require('./healthRoutes');
const kennedyRoutes = require('./kennedyRoutes');
/**
 * Routeur principal qui regroupe tous les routeurs de l'API
 */

// Routes de santé (publiques)
router.use('/', healthRoutes);

// Route racine de l'API
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API NoSQL Graph démarrée',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            alive: '/api/alive',
            info: '/api/info'
        },
        timestamp: new Date().toISOString()
    });
});

router.use('/kennedy', kennedyRoutes);

module.exports = router;
