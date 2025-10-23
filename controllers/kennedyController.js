const service = require('../services/kennedyService');
/**
 * @swagger
 * /kennedy/all:
 *   get:
 *     summary: Get all Kennedy
 *     description: Get all Kennedy from the database
 *     tags: [Kennedy]
 *     responses:
 *       200:
 *         description: All Kennedy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kennedy'
 */

async function getAllKennedy(req, res) {
    try {
        console.log('Début de la récupération des données Kennedy...');
        const allKennedy = await service.getAllKennedy();
        console.log('Données récupérées:', allKennedy);
        
        res.json({
            success: true,
            data: allKennedy,
            count: allKennedy.length
        });
    } catch (error) {
        console.error('Erreur dans getAllKennedy:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur lors de la récupération des données Kennedy',
            error: error.message 
        });
    }
}

module.exports = {
    getAllKennedy
};