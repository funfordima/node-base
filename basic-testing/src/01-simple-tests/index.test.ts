// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const a = 3;
  const b = 2;
  test('should add two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Add });
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Subtract });
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Multiply });
    expect(result).toBe(6);
  });

  test('should divide two numbers', () => {
    const a = 6;
    const result = simpleCalculator({ a, b, action: Action.Divide });
    expect(result).toBe(3);

    // const failedResult = simpleCalculator({ a, b: 0, action: Action.Divide });
    // expect(failedResult).toBe(Infinity);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Exponentiate });
    expect(result).toBe(9);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a, b, action: 'InvalidAction' });
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
