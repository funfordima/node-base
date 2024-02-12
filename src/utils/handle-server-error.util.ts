import { CustomServerResponse } from '../models/server-response.model';

export const handleServerError = (res: CustomServerResponse, err: unknown): void => {
  res.writeHead(500, {
    'Content-type': 'application/json',
  });

  res.end(JSON.stringify({
    message: `Server doesn't respond ${err}`,
  }));
};
