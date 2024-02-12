import type { CustomClientRequest } from '../models/client-request.model';
import type { CustomServerResponse } from '../models/server-response.model';
import { User } from '../models/user.model';
import { handleBadRequest } from '../utils/handle-bad-request.util';
import { handleNotFoundRequest } from '../utils/handle-not-found-request.util';
import { handleServerError } from '../utils/handle-server-error.util';
import { validateId } from '../utils/validate-id.util';

export const updateUser = (users: User[]) => (req: CustomClientRequest, res: CustomServerResponse) => {
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

      const newData = req.body;
      const updatedUser = new User({ ...user, ...newData });
      const { username, age } = updatedUser;
      const hasValidUserNameType = typeof username === 'string';
      const hasValidAgeType = typeof age === 'number';

      if (!username || !age || !hasValidUserNameType || !hasValidAgeType) {
        handleBadRequest(res);
        return;
      }
      
      const userIndex = users.findIndex(({ id }) => id === requestId);

      users[userIndex] = updatedUser;

      res.writeHead(200, {
        'Content-type': 'application/json'
      });

      res.send(updatedUser);
      return;
    }

    handleBadRequest(res);
  } catch (err) {
    handleServerError(res, err);
  }
};
