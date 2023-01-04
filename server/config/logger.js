const { createLogger, format, transports } = require('winston');

// Configurando Logger
const logger = createLogger({
  format: format.simple(),
  transports: [transports.Console()],
});

module.exports = logger;
