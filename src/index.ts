import 'dotenv/config';
import http from 'http';

const PORT = process.env.PORT || 5000;

const server = http.createServer();

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

