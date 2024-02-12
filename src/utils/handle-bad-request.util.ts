import { CustomServerResponse } from '../models/server-response.model';

export const handleBadRequest = (res: CustomServerResponse): void => {
  res.writeHead(400, {
    'Content-type': 'application/json',
  });

  res.send({
    message: 'Bad request',
  });
};
