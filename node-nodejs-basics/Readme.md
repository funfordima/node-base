# Node.js basics

## Technical requirements

- Use 20 LTS version of Node.js

## Project setup

1. Install Node.js
2. Install NVM link: <a href="https://github.com/coreybutler/nvm-windows">Download</a>
3. Fork this repository: <a href="https://github.com/funfordima/node-base/tree/feat/rs-node-basics">Node.js basics</a>
4. Clone your newly created repo: https://github.com/<%your_github_username%>/nodejs-basics/
5. Go to folder nodejs-basics
6. To run special file use: npm run 
  - [x] npm run fs:create
  - [x] npm run fs:copy"
  - [x] npm run fs:rename
  - [x] npm run fs:delete
  - [x] npm run fs:list
  - [x] npm run fs:read
  - [x] npm run cli:env
  - [x] npm run cli:args
  - [x] npm run modules
  - [x] npm run hash
  - [x] npm run stream:read
  - [x] npm run stream:write
  - [x] npm run stream:transform
  - [x] npm run zip:compress
  - [x] npm run zip:decompress
  - [x] npm run wt:main
  - [x] npm run cp

# Scoring: Node.js basics

## Basic Scope

- File system (src/fs)
    - **+6** `create.js` implemented properly
    - **+10** `copy.js` implemented properly
    - **+10** `rename.js` implemented properly
    - **+6** `delete.js` implemented properly
    - **+6** `list.js` implemented properly
    - **+6** `read.js` implemented properly
- Command line interface(src/cli)
    - **+6** `env.js` implemented properly
    - **+6** `args.js` implemented properly
- Modules(src/modules)
    - **+20** `cjsToEsm.cjs` refactored properly
- Hash (src/hash)
    - **+10** `calcHash.js` implemented properly
- Streams (src/streams)
    - **+10** `read.js` implemented properly
    - **+10** `write.js` implemented properly
    - **+10** `transform.js` implemented properly
- Zlib (src/zip)
    - **+10** `compress.js` implemented properly
    - **+10** `decompress.js` implemented properly

## Advanced Scope

- Worker Threads (src/wt)
    - **+10** `worker.js` implemented properly
    - **+30** `main.js` implemented properly
- Child Processes (src/cp)
    - **+10** spawns child process
    - **+10** child process `stdin` receives input from master process `stdin`
    - **+10** child process `stdout` sends data to master process `stdout`

## Forfeits

- **-95% of total task score** Any external tools/libraries are used
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
