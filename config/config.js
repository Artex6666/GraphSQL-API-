module.exports = {
    database: {
        uri: 'bolt://localhost:7687',
        user: 'neo4j',
        password: 'password',
        database: 'neo4j'
    },
    
    logging: {
        console: true,
        file: false,
        timestamp: true
    },
    
    queries: {
        limit: 1000 
    },

    app: {
        port: 2000
    },

    jwt: {
        secret: 'COUCOU1234567890',
        expiresIn: '1h'
    },
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
};
