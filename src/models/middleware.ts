import { CustomClientRequest } from './client-request.model';
import { CustomServerResponse } from './server-response.model';

export type Middleware = (req: CustomClientRequest, res: CustomServerResponse) => unknown;
