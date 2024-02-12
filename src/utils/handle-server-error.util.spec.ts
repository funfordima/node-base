import type { CustomServerResponse } from '../models/server-response.model';
import { handleServerError } from './handle-server-error.util';

describe('handle internal server error', () => {
  const res = {
    writeHead: jest.fn(),
    end: jest.fn(),
  };
  const errorMessage = 'Internal server error';

  it('should send correct message while handle bad request', () => {
    handleServerError(res as unknown as CustomServerResponse, errorMessage);

    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toBeCalledWith(JSON.stringify({
      message: `Server doesn't respond ${errorMessage}`,
    }));
  });
});
