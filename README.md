# API NoSQL Graph

Une API Express avec authentification JWT pour la gestion de graphes NoSQL.


```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Démarrer en mode production
npm start
```

### Routes publiques 

- `GET /api/` - Page d'accueil de l'API
- `GET /api/alive` - Vérifier que l'API est en vie
- `GET /api/health` - Santé complète de l'API
- `GET /api/info` - Informations sur l'API
- `GET /api-docs` - Documentation interactive Swagger

### Routes protégées (JWT)


## JWT:

### Middlewares dispos

- `authenticateToken` - Authentification obligatoire
- `optionalAuth` - Authentification optionnelle
- `generateToken` - Génération de token

## Logging

Le système de logging est configuré dans `config/config.js` et utilise le logger personnalisé dans `utils/logger.js` :

- **Console** : Logs affichés dans la console (configurable)
- **Fichier JSON** : Logs sauvegardés dans `logs/api-YYYY-MM-DD.log`
- **Niveaux** : info, error, warn, debug, http
- **Métadonnées** : Timestamp, IP, User-Agent, temps de réponse

Documentation Swagger sur `/api-docs`
