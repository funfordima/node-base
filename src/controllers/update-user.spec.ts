import type { CustomClientRequest } from '../models/client-request.model';
import type { CustomServerResponse } from '../models/server-response.model';
import { User } from '../models/user.model';
import { updateUser } from './update-user';

describe('update user', () => {
  const user = new User({
    id: '52a72783-f365-4430-881d-80fcd20f0425',
    username: 'TestUser',
    age: 25,
    hobbies: ['test-1', 'test-2'],
  });
  const users = [user];
  const body = {
    age: 34,
    hobbies: ['test-1', 'test-4'],
  };
  const req = {
    pathName: '52a72783-f365-4430-881d-80fcd20f0425',
    body,
  };
  const res = {
    writeHead: jest.fn(),
    end: jest.fn(),
  };

  it('should update existent user', () => {
    const func = updateUser(users);
    func(req as CustomClientRequest, res as unknown as CustomServerResponse);

    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
    expect(users[0].age).toBe(34);
    expect(users[0].hobbies).toStrictEqual(['test-1', 'test-4']);
    expect(users[0].username).toBe('TestUser');
  });
});
