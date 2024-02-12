import { CustomClientRequest } from '../models/client-request.model';
import { CustomServerResponse } from '../models/server-response.model';

export const jsonParser = (_: CustomClientRequest, res: CustomServerResponse): void => {
  res.send = (data: unknown) => {
    res.end(JSON.stringify(data));
  }
};
