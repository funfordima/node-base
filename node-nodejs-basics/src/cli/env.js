const parseEnv = () => {
  const PREFIX = 'RSS_';
  const argumentList = Object.entries(process.env);
  const filteredArguments = argumentList.filter((entry) => entry[0].startsWith(PREFIX));

  filteredArguments.forEach(([key, value]) => {
    process.stdout.write(`${key} = ${value}; `);
  });
};

parseEnv();