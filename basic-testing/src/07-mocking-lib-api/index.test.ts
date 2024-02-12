// Uncomment the code below and write your tests
jest.mock('axios');

import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const filePath = 'test-path';
  const basePath = { baseURL: 'https://jsonplaceholder.typicode.com' };
  const responseData = { data: 'test' };
  const mockedAxios = jest.mocked(axios);
  let axiosGetSpy: jest.Mock<any, any, any>;
  let response = '';
  
  beforeEach(async () => {
    axiosGetSpy = jest.fn().mockResolvedValue(responseData);
    const axiosCreateSpy = jest.fn().mockImplementation(() => ({
      get: (filePath: string) => axiosGetSpy(filePath)
    }));
    mockedAxios.create = axiosCreateSpy;

    response = await throttledGetDataFromApi(filePath);
    jest.runAllTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    expect(mockedAxios.create).toHaveBeenCalledTimes(1);
    expect(mockedAxios.create).toHaveBeenCalledWith(basePath);
  });

  test('should perform request to correct provided url', async () => {
    expect(axiosGetSpy).toHaveBeenCalledWith(filePath);
  });

  test('should return response data', async () => {
    expect(response).toBe(responseData.data);
  });
});
