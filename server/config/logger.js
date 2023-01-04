const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');
const stripFinalNewline = require('strip-final-newline');

// Configurando Logger
const logger = createLogger({
  format: format.simple(),
  transports: [new transports.Console()],
});

// Configurando request logger
morgan.token('id', (req) => req.id);

const requestFormat = ':remote-addr[:date[iso]]:id":method:url":status';
const requests = morgan(requestFormat, {
  stream: {
    write: (message) => {
      const log = stripFinalNewline(message);
      return logger.info(log);
    },
  },
});

// Adjuntando al logger object
logger.requests = requests;

module.exports = logger;
