const neo4j = require('neo4j-driver');
const config = require('../config/config');

const driver = neo4j.driver(config.database.uri, neo4j.auth.basic(config.database.user, config.database.password));

async function getAllKennedy() {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (n:Person) RETURN n');
        const kennedyData = result.records.map(record => record.get('n').properties);
        return kennedyData;
    } catch (error) {
        console.error('Erreur lors de la récupération des données Kennedy:', error);
        throw error;
    } finally {
        await session.close();
    }
}

module.exports = {
    getAllKennedy
};