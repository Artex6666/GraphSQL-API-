const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

/**
 * Routes de santé et statut de l'API
 * Toutes ces routes sont publiques (pas d'authentification requise)
 */

// GET /api/alive - Vérifier que l'API est en vie
router.get('/alive', healthController.getAlive);

// GET /api/health - Vérifier la santé complète de l'API
router.get('/health', healthController.getHealth);

// GET /api/info - Informations sur l'API
router.get('/info', healthController.getInfo);

module.exports = router;
