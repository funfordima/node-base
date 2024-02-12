import type { CustomServerResponse } from '../models/server-response.model';
import { handleNotFoundRequest } from './handle-not-found-request.util';

describe('handle not-found request', () => {
  const res = {
    writeHead: jest.fn(),
    send: jest.fn(),
  };
  const requestId = 'testId';

  it('should send correct message while handle bad request', () => {
    handleNotFoundRequest(res as unknown as CustomServerResponse, requestId);

    expect(res.writeHead).toHaveBeenCalled();
    expect(res.send).toBeCalledWith({
      message: `User with id: ${requestId} doesn't exist`,
    });
  });
});
