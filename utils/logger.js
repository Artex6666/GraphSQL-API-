const fs = require('fs');
const path = require('path');
const config = require('../config/config');

/**
 * Système de logging personnalisé
 * Supporte la sortie console et fichier JSON selon la configuration
 */
class Logger {
    constructor() {
        this.logDir = path.join(__dirname, '../logs');
        this.ensureLogDirectory();
    }

    /**
     * Crée le dossier logs s'il n'existe pas
     */
    ensureLogDirectory() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    /**
     * Génère un nom de fichier de log basé sur la date
     */
    getLogFileName() {
        const date = new Date().toISOString().split('T')[0];
        return path.join(this.logDir, `api-${date}.log`);
    }

    /**
     * Formate un message de log
     */
    formatLog(level, message, meta = {}) {
        const timestamp = config.logging.timestamp ? new Date().toISOString() : null;
        
        const logEntry = {
            timestamp,
            level,
            message,
            ...meta
        };

        return config.logging.timestamp ? 
            `[${timestamp}] [${level.toUpperCase()}] ${message}` :
            `[${level.toUpperCase()}] ${message}`;
    }

    /**
     * Écrit dans le fichier de log
     */
    writeToFile(logEntry, meta = {}) {
        if (!config.logging.file) return;

        const logData = {
            timestamp: new Date().toISOString(),
            level: logEntry.split(']')[1]?.replace('[', '').replace(']', '').trim(),
            message: logEntry.split('] ')[2] || logEntry,
            ...meta
        };

        const logLine = JSON.stringify(logData) + '\n';
        
        try {
            fs.appendFileSync(this.getLogFileName(), logLine);
        } catch (error) {
            console.error('Erreur lors de l\'écriture du log:', error);
        }
    }

    /**
     * Log d'information
     */
    info(message, meta = {}) {
        const logEntry = this.formatLog('info', message, meta);
        
        if (config.logging.console) {
            console.log(logEntry);
        }
        
        this.writeToFile(logEntry, meta);
    }

    /**
     * Log d'erreur
     */
    error(message, meta = {}) {
        const logEntry = this.formatLog('error', message, meta);
        
        if (config.logging.console) {
            console.error(logEntry);
        }
        
        this.writeToFile(logEntry, meta);
    }

    /**
     * Log d'avertissement
     */
    warn(message, meta = {}) {
        const logEntry = this.formatLog('warn', message, meta);
        
        if (config.logging.console) {
            console.warn(logEntry);
        }
        
        this.writeToFile(logEntry, meta);
    }

    /**
     * Log de debug
     */
    debug(message, meta = {}) {
        const logEntry = this.formatLog('debug', message, meta);
        
        if (config.logging.console) {
            console.debug(logEntry);
        }
        
        this.writeToFile(logEntry, meta);
    }

    /**
     * Log de requête HTTP
     */
    http(req, res, responseTime) {
        const meta = {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            responseTime: `${responseTime}ms`,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        };

        const message = `${req.method} ${req.url} ${res.statusCode} - ${responseTime}ms`;
        const logEntry = this.formatLog('http', message, meta);
        
        if (config.logging.console) {
            console.log(logEntry);
        }
        
        this.writeToFile(logEntry, meta);
    }

    /**
     * Log d'erreur d'application
     */
    appError(error, req = null) {
        const meta = {
            stack: error.stack,
            name: error.name,
            ...(req && {
                method: req.method,
                url: req.url,
                ip: req.ip
            })
        };

        this.error(`Erreur d'application: ${error.message}`, meta);
    }
}

// Instance singleton du logger
const logger = new Logger();

module.exports = logger;
