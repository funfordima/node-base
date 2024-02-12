import { CustomClientRequest } from '../models/client-request.model';
import { CustomServerResponse } from '../models/server-response.model';
import type { User } from '../models/user.model';
import { handleBadRequest } from '../utils/handle-bad-request.util';
import { handleNotFoundRequest } from '../utils/handle-not-found-request.util';
import { handleServerError } from '../utils/handle-server-error.util';
import { validateId } from '../utils/validate-id.util';

export const deleteUser = (users: User[]) => (req: CustomClientRequest, res: CustomServerResponse) => {
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

      const userIndex = users.findIndex(({ id }) => id === requestId);

      users.splice(userIndex, 1);

      res.writeHead(204, {
        'Content-type': 'application/json'
      });

      res.end(null);
      
      return;
    }

    handleBadRequest(res);
  } catch (err) {
    handleServerError(res, err);
  }
};
