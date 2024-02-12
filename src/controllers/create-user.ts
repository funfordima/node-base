import type { CustomClientRequest } from '../models/client-request.model';
import type { CustomServerResponse } from '../models/server-response.model';
import { User } from '../models/user.model';
import { handleBadRequest } from '../utils/handle-bad-request.util';
import { handleServerError } from '../utils/handle-server-error.util';

export const createUser = (users: User[]) => (req: CustomClientRequest, res: CustomServerResponse) => {
  try {
    const requestPath = req.pathName;
    const user = new User(req.body);
    const { username, age } = user;
    const hasValidUserNameType = typeof username === 'string';
    const hasValidAgeType = typeof age === 'number';

    if (!username || !age || requestPath || !hasValidUserNameType || !hasValidAgeType) {
      handleBadRequest(res);
      return;
    }

    users.push(user);

    res.writeHead(201, {
      'Content-type': 'application/json'
    });

    res.send(user);
  } catch (err) {
    handleServerError(res, err);
  }
};
