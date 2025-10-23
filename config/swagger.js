const swaggerJSDoc = require('swagger-jsdoc');
const config = require('./config');

/**
 * Configuration Swagger pour la documentation de l'API
 */
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NoSQL Graph API',
            version: '1.0.0',
            description: 'API Express pour la gestion de graphes NoSQL avec authentification JWT',
            
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: `http://localhost:${config.app.port}/api`,
                description: 'Serveur de développement'
            },
            {
                url: `http://23.230.22.6:${config.app.port}/api`,
                description: 'Serveur de production'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Entrez votre token JWT'
                }
            },
            schemas: {
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Opération réussie'
                        },
                        data: {
                            type: 'object'
                        }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'Une erreur est survenue'
                        },
                        error: {
                            type: 'string',
                            example: 'Détails de l\'erreur'
                        }
                    }
                },
                HealthResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        status: {
                            type: 'string',
                            example: 'healthy'
                        },
                        timestamp: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-01-01T12:00:00.000Z'
                        },
                        uptime: {
                            type: 'number',
                            example: 123.456
                        },
                        memory: {
                            type: 'object',
                            properties: {
                                used: {
                                    type: 'string',
                                    example: '45 MB'
                                },
                                total: {
                                    type: 'string',
                                    example: '128 MB'
                                }
                            }
                        },
                        version: {
                            type: 'string',
                            example: '1.0.0'
                        },
                        environment: {
                            type: 'string',
                            example: 'development'
                        }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [
        './routes/*.js',
        './controllers/*.js'
    ]
};

// Générer la spécification Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
