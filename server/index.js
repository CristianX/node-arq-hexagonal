const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.json({
    message: 'Bienvenido a la API LMU40',
  });
});

// Manejo de ruta no encontrada
app.use((req, res, next) => {
  res.status(404);
  res.json({
    message: 'ERROR: Ruta no encontrada',
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
