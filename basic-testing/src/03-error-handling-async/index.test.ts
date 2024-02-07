// Uncomment the code below and write your tests
import { resolveValue, throwError, throwCustomError, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(resolveValue('test')).resolves.toBe('test');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Custom error message.';
    expect(() => throwError(errorMessage)).toThrow();
    expect(() => throwError(errorMessage)).toThrow(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultErrorMessage = 'Oops!';
    expect(() => throwError()).toThrow();
    expect(() => throwError()).toThrow(defaultErrorMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const errorMessage = 'This is my awesome custom error!';
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    expect(() => throwCustomError()).toThrow(errorMessage);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError()).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
