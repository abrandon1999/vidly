const winston = require("winston");

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: "error.log"
        })
    ]
});

module.exports = function (err,req,res,next){
    console.log(err)
    logger.log({
        level: 'error',
        message: err.message
    });
    res.status(500).send("Something failed...");
}