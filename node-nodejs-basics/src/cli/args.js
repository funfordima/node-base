const parseArgs = () => {
  const result = [];
  const argumentList = process.argv.slice(2);
  const listLength = argumentList.length;
  let i = 0;

  while (i <= listLength - 1) {
    if (argumentList[i].startsWith('--')) {
      if (!argumentList[i + 1] || argumentList[i + 1].startsWith('--')) {
        result.push([argumentList[i], undefined]);
      } else {
        result.push([argumentList[i], argumentList[i + 1]]);
      }
    }

    i++;
  }

  const mappedResult = result.map(([key, value]) => `${key} is ${value}`).join(', ');

  console.log(mappedResult);
};

parseArgs();