import type { CustomClientRequest } from '../models/client-request.model';
import type { CustomServerResponse } from '../models/server-response.model';
import { User } from '../models/user.model';
import { deleteUser } from './delete-user';

describe('delete user', () => {
  const user = new User({
    id: '52a72783-f365-4430-881d-80fcd20f0425',
    username: 'TestUser',
    age: 25,
    hobbies: ['test-1', 'test-2'],
  });
  const users = [user];
  const req = {
    pathName: '52a72783-f365-4430-881d-80fcd20f0425',
  };
  const res = {
    writeHead: jest.fn(),
    end: jest.fn(),
  };

  it('should delete existent user', () => {
    const func = deleteUser(users);
    func(req as CustomClientRequest, res as unknown as CustomServerResponse);

    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
    expect(users.length).toBe(0);
  });
});
