import { MethodsEnum } from '../constants/methods.constant';
import { CustomClientRequest } from './client-request.model';
import { CustomServerResponse } from './server-response.model';

export interface Methods {
  [MethodsEnum.GET]?: (req: CustomClientRequest, res: CustomServerResponse) => unknown;
  [MethodsEnum.POST]?: (req: CustomClientRequest, res: CustomServerResponse) => unknown;
  [MethodsEnum.PUT]?: (req: CustomClientRequest, res: CustomServerResponse) => unknown;
  [MethodsEnum.DELETE]?: (req: CustomClientRequest, res: CustomServerResponse) => unknown;
}
