jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timer = 2_000;
    const spyCallback = jest.fn();
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(spyCallback, timer);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timer);
  });

  test('should call callback only after timeout', () => {
    const timer = 2_000;
    const spyCallback = jest.fn();

    expect(spyCallback).not.toHaveBeenCalled();

    doStuffByTimeout(spyCallback, timer);
    jest.runAllTimers();

    expect(spyCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const timer = 2_000;
    const spyCallback = jest.fn();
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(spyCallback, timer);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), timer);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const timer = 2_000;
    const spyCallback = jest.fn();

    expect(spyCallback).not.toHaveBeenCalled();

    doStuffByInterval(spyCallback, timer);

    jest.advanceTimersByTime(timer);
    expect(spyCallback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(timer);
    expect(spyCallback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const filePath = 'non-existent-file-path.txt';

  test('should call join with pathToFile', async () => {
    const mockedJoin = jest.mocked(join);
    expect.assertions(1);
    await readFileAsynchronously(filePath);

    expect(mockedJoin).toHaveBeenCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    expect.assertions(1);
    const result = await readFileAsynchronously(filePath);

    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.mocked(existsSync).mockReturnValue(true);
    jest.mocked(join).mockReturnValue(filePath);
    jest.mocked(readFile).mockResolvedValue(filePath);

    expect.assertions(1);
    const result = await readFileAsynchronously(filePath);

    expect(result).toBe(filePath);
  });
});
