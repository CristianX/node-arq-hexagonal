const express = require('express');

const logger = require('./config/logger');

const app = express();

app.get('/', (req, res, next) => {
  res.json({
    message: 'Bienvenido a la API LMU40',
  });
});

// Manejo de ruta no encontrada
app.use((req, res, next) => {
  const message = 'ERROR: Ruta no encontrada';
  const statusCode = 404;

  logger.warn(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  logger.error(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
