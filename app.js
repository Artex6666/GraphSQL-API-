const express = require('express');
const app = express();
const config = require('./config/config');
const colors = require('colors');

// Import des middlewares
const { corsMiddleware, requestLogger, errorHandler, notFound } = require('./middlewares/cors');

// Import des routeurs
const apiRoutes = require('./routes');

// Middlewares globaux
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(requestLogger);

// Routes de l'API
app.use('/api', apiRoutes);

// Middleware pour les routes non trouvées
app.use(notFound);

// Middleware de gestion d'erreurs (doit être en dernier)
app.use(errorHandler);

// Démarrage du serveur
const PORT = config.app.port || 2000;
app.listen(PORT, () => {
    console.log(`🚀 API démarrée sur le port ${PORT}`.green);
    console.log(`📊 Endpoints disponibles:`.cyan);
    console.log(`   - GET  /api/alive  - Vérifier que l'API est en vie`.white);
    console.log(`   - GET  /api/health - Santé complète de l'API`.white);
    console.log(`   - GET  /api/info  - Informations sur l'API`.white);
    console.log(`   - GET  /api/      - Page d'accueil de l'API`.white);
});

