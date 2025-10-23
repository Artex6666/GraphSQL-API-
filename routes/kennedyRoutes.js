const express = require('express');
const router = express.Router();
const kennedyController = require('../controllers/kennedyController');
const middleware = require('../middlewares/auth');

router.get('/all', kennedyController.getAllKennedy);

module.exports = router;