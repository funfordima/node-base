import type { CustomClientRequest } from '../models/client-request.model';
import type { CustomServerResponse } from '../models/server-response.model';
import type { User } from '../models/user.model';
import { handleBadRequest } from '../utils/handle-bad-request.util';
import { handleNotFoundRequest } from '../utils/handle-not-found-request.util';
import { handleServerError } from '../utils/handle-server-error.util';
import { validateId } from '../utils/validate-id.util';

export const getUsers = (users: User[]) => (req: CustomClientRequest, res: CustomServerResponse) => {
  try {
    const requestId = req.pathName;

    if (requestId) {
      const isValidId = validateId(requestId);

      if (!isValidId) {
        handleBadRequest(res);
        return;
      }

      const user = users.find(({ id }) => id === requestId);

      if (!user) {
        handleNotFoundRequest(res, requestId);
        return;
      }

      res.writeHead(200, {
        'Content-type': 'application/json'
      });

      res.send(user);
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Process-id', 'process.pid');

    res.send(users);
  } catch (err) {
    handleServerError(res, err);
  }
};
