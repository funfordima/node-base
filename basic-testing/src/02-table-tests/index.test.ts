// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  test.each`
    a            | b    | action                | expected | description
    ${-6}        | ${2} | ${Action.Add}         | ${-4}    | ${'should add two numbers'} 
    ${0}         | ${2} | ${Action.Add}         | ${2}     | ${'should add two numbers'}  
    ${6}         | ${2} | ${Action.Add}         | ${8}     | ${'should add two numbers'}  
    ${-6}        | ${2} | ${Action.Subtract}    | ${-8}    | ${'should subtract two numbers'} 
    ${0}         | ${2} | ${Action.Subtract}    | ${-2}    | ${'should subtract two numbers'}  
    ${6}         | ${2} | ${Action.Subtract}    | ${4}     | ${'should subtract two numbers'}  
    ${-6}        | ${2} | ${Action.Multiply}    | ${-12}   | ${'should multiply two numbers'} 
    ${0}         | ${2} | ${Action.Multiply}    | ${0}     | ${'should multiply two numbers'}  
    ${6}         | ${2} | ${Action.Multiply}    | ${12}    | ${'should multiply two numbers'}  
    ${-6}        | ${2} | ${Action.Divide}      | ${-3}    | ${'should divide two numbers'} 
    ${0}         | ${2} | ${Action.Divide}      | ${0}     | ${'should divide two numbers'}  
    ${6}         | ${2} | ${Action.Divide}      | ${3}     | ${'should divide two numbers'}  
    ${-6}        | ${2} | ${Action.Exponentiate}| ${36}    | ${'should exponentiate two numbers'} 
    ${0}         | ${2} | ${Action.Exponentiate}| ${0}     | ${'should exponentiate two numbers'}  
    ${6}         | ${2} | ${Action.Exponentiate}| ${36}    | ${'should exponentiate two numbers'}  
    ${0}         | ${2} | ${''}                 | ${null}  | ${'should return null for invalid action'}  
    ${6}         | ${2} | ${'Invalid action'}   | ${null}  | ${'should return null for invalid action'}
    ${BigInt(1)} | ${2} | ${Action.Add}         | ${null}  | ${'should return null for out of range arguments'} 
    ${'3'}       | ${2} | ${Action.Add}         | ${null}  | ${'should return null for out of range arguments'}  
    ${null}      | ${2} | ${Action.Add}         | ${null}  | ${'should return null for out of range arguments'}  
    ${undefined} | ${2} | ${Action.Add}         | ${null}  | ${'should return null for out of range arguments'} 
    ${{}}        | ${2} | ${Action.Add}         | ${null}  | ${'should return null for out of range arguments'}  
    ${[]}        | ${2} | ${Action.Add}         | ${null}  | ${'should return null for out of range arguments'}  
  `('$description', ({a, b, action, expected}) => {
    expect(simpleCalculator({ a, b, action: action })).toBe(expected);
  });
});
