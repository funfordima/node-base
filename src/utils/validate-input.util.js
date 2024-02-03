import { commandList } from '../constants/command-list.constant.js';

export const validateInput = (input) => {
  const [method, ...params] = input.split(' ');

  if (!commandList.includes(method)) {
    console.log('\x1b[31m', 'Invalid input. \n\x1b[0m');

    return {
      method: 'cd',
      params: [], 
    };
  }

  return {
    method,
    params,
  };
};
