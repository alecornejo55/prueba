const winston = require('winston');

const createLogger = (env) => {
    if(env == 'PROD'){
        return winston.createLogger({
            transports: [
                new winston.transports.File({filename: './src/log/warn.log',level: "warn"}),
                new winston.transports.File({filename: './src/log/error.log',level: "error"}),
                new winston.transports.Console({level: "info"})
            ]
        })
    }
    else {
        return winston.createLogger({
            transports: [
                new winston.transports.File({filename: './src/log/warn.log',level: "warn"}),
                new winston.transports.File({filename: './src/log/error.log',level: "error"}),
                new winston.transports.Console({level: "info"})
            ]
        })
    }
}

module.exports = {
    createLogger
}