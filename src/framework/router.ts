import { MethodsEnum } from '../constants/methods.constant';
import { CustomClientRequest } from '../models/client-request.model';
import { Endpoint } from '../models/endpoint.model';
import { CustomServerResponse } from '../models/server-response.model';

export class UserRouter {
  endpoints: Endpoint = {};

  private request(method: MethodsEnum, path: string, handler: (req: CustomClientRequest, res: CustomServerResponse) => unknown) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (this.endpoints[path][method]) {
      throw new Error(`${method} already exists in this path ${path}`);
    }

    endpoint[method] = handler;
  }

  get(path: string, handler: (req: CustomClientRequest, res: CustomServerResponse) => unknown) {
    this.request(MethodsEnum.GET, path, handler);
  }

  post(path: string, handler: (req: CustomClientRequest, res: CustomServerResponse) => unknown) {
    this.request(MethodsEnum.POST, path, handler);
  }

  put(path: string, handler: (req: CustomClientRequest, res: CustomServerResponse) => unknown) {}

  delete(path: string, handler: (req: CustomClientRequest, res: CustomServerResponse) => unknown) {}
}