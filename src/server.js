require('dotenv').config();
const http = require('http');
const express = require('express');
const { routeInit } = require('./presentation-layer/routes/route-init');
const expressConfig = require('./config/express-config');

const app = express();
const server = http.createServer(app);

routeInit(app, express);

server.listen(expressConfig.PORT, () =>
  console.log(`Server is listening on port: ${expressConfig.PORT}`),
);
