const express = require('express');
const requestId = require('express-request-id')();

const logger = require('./config/logger');

// iniciando app
const app = express();

// configurando Middleware
app.use(requestId);
app.use(logger.requests);

app.get('/', (req, res, next) => {
  res.json({
    message: 'Bienvenido a la API LMU40',
  });
});

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
