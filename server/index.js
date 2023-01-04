const express = require('express');

const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

app.listen(port, () => {
  console.log(`App de ejemplo corriendo en http://localhost:${port}`);
});
