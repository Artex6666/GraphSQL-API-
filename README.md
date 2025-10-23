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

## Endpoints disponibles

### Routes publiques 

- `GET /api/` - Page d'accueil de l'API
- `GET /api/alive` - Vérifier que l'API est en vie
- `GET /api/health` - Santé complète de l'API
- `GET /api/info` - Informations sur l'API

### Routes protégées (JWT)


## JWT:

### Middlewares dispos

- `authenticateToken` - Authentification obligatoire
- `optionalAuth` - Authentification optionnelle
- `generateToken` - Génération de token
