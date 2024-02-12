import http from 'http';
import type { Server } from 'http';
import EventEmitter from 'events';

import { MethodsEnum } from '../constants/methods.constant';
import { CustomClientRequest } from '../models/client-request.model';
import { CustomServerResponse } from '../models/server-response.model';
import { Middleware } from '../models/middleware';
import type { UserRouter } from './router';
import { routerPrefix } from '../constants/router.constant';

class Application {
  emitter = new EventEmitter();
  server = this.createServer();
  middleWares: Middleware[] = [];

  addRouter(router: UserRouter) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];

      Object.keys(endpoint).forEach((method) => {

        this.emitter.on(this.getRouterMask(path, method as MethodsEnum), (req, res) => {
          const handler = endpoint[method as MethodsEnum];

          return handler?.(req, res);
        });
      });
    });
  }

  use(middleware: (req: CustomClientRequest, res: CustomServerResponse) => unknown): void {
    this.middleWares.push(middleware);
  }

  listen(port: string | number, callback: () => void): void {
    this.server.on('clientError', (_, socket) => {
      socket.end('HTTP/1.1 500 Bad Request\r\n\r\n');
    });

    this.server.listen(port, callback);
  }

  private createServer(): Server {
    return http.createServer((req: CustomClientRequest, res) => {
      let body = '';

      req.on('data', (chunk: Buffer) => {
        body += chunk;
      });

      req.on('error', (err) => {
        res.writeHead(500, {
          'Content-type': 'application/json'
        });
        res.end(JSON.stringify({
          message: `Server doesn't respond ${err.message}`,
        }));
      });

      req.on('end', () => {
        if (body) {
          req.body = JSON.parse(body);
        }

        this.middleWares.forEach((middleware) => middleware(req, res as any));
        const emitted = this.emitter.emit(this.getRouterMask(req.url!, req.method as MethodsEnum), req, res);
        
        if (!emitted) {
          res.writeHead(404, {
            'Content-type': 'application/json'
          });

          res.end(JSON.stringify({
            message: `Requested page ${req.url} doesn't exist`,
          }));
        }
      });
    });
  }

  private getRouterMask(path: string, method: MethodsEnum): string {
    let newPath = path;

    if (path.startsWith(routerPrefix)) {
      const urlList = path.split('/').reduce<string[]>((acc, val) => (val ? (acc.push(val), acc) : acc), []);

      newPath = '/' + urlList.slice(0, 2);
    }

    return `[${newPath}]:[${method}]`;
  }
}

export default Application;
