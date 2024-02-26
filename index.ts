import { HTTP_PORT, WSS_PORT } from 'src/constants/ports.constant';
import { httpServer } from './src/http-server';
import { Application } from 'src/application/application';

const httpPort = process.env.HTTP_PORT || HTTP_PORT;
const wsPort = Number(process.env.WSS_PORT || WSS_PORT);

httpServer.listen(httpPort, () => console.log(`Start static http server on the ${httpPort} port!`));

const game = new Application();
game.init(wsPort)
