import https from 'https';

export const getRepos = (userName, done) => {
  if (!userName) {
    return done(new Error('UserName is required.'), null); 
  }

  let result;
  const options = {
    hostname: 'api.github.com',
    path: `/users/${userName}/repos`,
    headers: {
      'User-agent': 'github-app',
    },
  };

  const request = https.get(options, (res) => {
    console.log(res.statusCode);
    
    if (res.statusCode !== 200) {
      return done(new Error('Error working with the server.'));
    }

    res.setEncoding('utf-8');
    let body = '';
    res.on('data', (data) => (body += data));
    res.on('end', () => {
      try {
        result = JSON.parse(body);
        done(null, result);
      } catch (error) {
        done(new Error('Failed to process data.'), null);
      }
    });
  });

  request.on('error', (err) => done(err, null));
};
