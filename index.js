const http = require('http');

const app = require('./server');
const config = require('./server/config');
const database = require('./server/database');

// Conexión a la base de datos
database.connect(config.database, {});

const { port } = config.server;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server corriendo en el puerto: ${port}`);
});
