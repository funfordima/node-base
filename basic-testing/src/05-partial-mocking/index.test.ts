import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

const spyMockOne = jest.fn();
const spyMockTwo = jest.fn();
const spyMockThree = jest.fn();

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: () => spyMockOne(),
    mockTwo: () => spyMockTwo(),
    mockThree: () => spyMockThree(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spyConsole = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();
    
    expect(spyMockOne).toHaveBeenCalledTimes(1);
    expect(spyMockTwo).toHaveBeenCalledTimes(1);
    expect(spyMockThree).toHaveBeenCalledTimes(1);
    expect(spyConsole).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const spyConsole = jest.spyOn(console, 'log');

    unmockedFunction();

    expect(spyConsole).toHaveBeenCalledTimes(1);
  });
});
