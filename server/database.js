const mongoose = require('mongoose');

const logger = require('./config/logger');

exports.connect = (
  { protocol = 'mongodb', url, username = '', password = '' },
  options = {}
) => {
  let dburl = '';

  // Autenticación requerida
  if (username && password) {
    dburl = `${protocol}://${username}:${password}@${url}`;
  } else {
    dburl = `${protocol}://${url}`;
  }

  // Conexión a la base de datos
  mongoose.connect(dburl, {
    ...options,
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('open', () => {
    logger.info('Conectado a la base de datos');
  });

  mongoose.connection.on('close', () => {
    logger.info('Desconectado de la base de datos');
  });

  mongoose.connection.on('error', (err) => {
    logger.error('Error en la conexión a la base de datos', err);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Conexión a la base de datos cerrada por el proceso');
      process.exit(0);
    });
  });

  exports.disconnect = () => {
    mongoose.connection.close(() => {
      logger.info('Conexión a la base de datos cerrada');
    });
  };
};
