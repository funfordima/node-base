import type { CustomServerResponse } from '../models/server-response.model';
import { handleBadRequest } from './handle-bad-request.util';

describe('handle bad request', () => {
  const res = {
    writeHead: jest.fn(),
    send: jest.fn(),
  };

  it('should send correct message while handle bad request', () => {
    handleBadRequest(res as unknown as CustomServerResponse);

    expect(res.writeHead).toHaveBeenCalled();
    expect(res.send).toBeCalledWith({
      message: 'Bad request',
    });
  });
});
