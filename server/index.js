const express = require('express');
const requestId = require('express-request-id')();
const bodyParser = require('body-parser');

const logger = require('./config/logger');
const api = require('./api/v1');

// iniciando app
const app = express();

// configurando Middleware
app.use(requestId);
app.use(logger.requests);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Configurando router y routes
app.use('/api', api);
app.use('/api/v1', api);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  next({
    message: 'Ruta no encontrada',
    statusCode: 404,
    level: 'warn',
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  const { message, statusCode = 500, level = 'error' } = err;
  const log = `${logger.header(req)} ${statusCode} ${message}`;

  logger[level](log);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
