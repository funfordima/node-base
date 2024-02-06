// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const list = [-3, 0, 3];
  const b = 2;
  test('should add two numbers', () => {
    const expectedResult = [-1, 2, 5];
    list.forEach((a, i) => {
      const result = simpleCalculator({ a, b, action: Action.Add });
      expect(result).toBe(expectedResult[i]);
    });
  });

  test('should subtract two numbers', () => {
    const expectedResult = [-5, -2, 1];
    list.forEach((a, i) => {
      const result = simpleCalculator({ a, b, action: Action.Subtract });
      expect(result).toBe(expectedResult[i]);
    });
  });

  test('should multiply two numbers', () => {
    const expectedResult = [-6, 0, 6];
    list.forEach((a, i) => {
      const result = simpleCalculator({ a, b, action: Action.Multiply });
      expect(result).toBe(expectedResult[i]);
    });
  });

  test('should divide two numbers', () => {
    // Infinity?
    const list = [-6, 0, 6];
    const expectedResult = [-3, 0, 3];
    list.forEach((a, i) => {
      const result = simpleCalculator({ a, b, action: Action.Divide });
      expect(result).toBe(expectedResult[i]);
    });
  });

  test('should exponentiate two numbers', () => {
    const expectedResult = [9, 0, 9];
    list.forEach((a, i) => {
      const result = simpleCalculator({ a, b, action: Action.Exponentiate });
      expect(result).toBe(expectedResult[i]);
    });
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 3, b, action: 'InvalidAction' });
    expect(result).toBe(null);
  });

  test('should return null for out of range arguments', () => {
    // Infinity ?
    const invalidArgumentList = [BigInt(1), '3', null, undefined, {}, []];

    invalidArgumentList.forEach((argA) => {
      const result = simpleCalculator({ a: argA, b, action: Action.Add });
      expect(result).toBe(null);
    });
  });
});
