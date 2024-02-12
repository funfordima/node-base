import { CustomServerResponse } from '../models/server-response.model';

export const handleNotFoundRequest = (res: CustomServerResponse, requestId: string): void => {
  res.writeHead(404, {
    'Content-type': 'application/json',
  });

  res.send({
    message: `User with id: ${requestId} doesn't exist`,
  });
};
