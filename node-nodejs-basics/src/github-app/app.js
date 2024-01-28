import { getRepos } from './github.js';

const userName = process.argv[2];

getRepos(userName, (err, repos) => {
  if (err) {
    return console.error(err.message);
  }

  repos.forEach((repo) => console.log(repo.name));
})