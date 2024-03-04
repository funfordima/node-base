Task: [link](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/graphql-service/assignment.md)
Score: 360/360 [Score](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/graphql-service/score.md)
Done / deadline: 04.03.2024/05.03.2024

# Scoring: Graphql
# Basic Scope
 - [x] +144 1.1 npm run test-queries
 - [x] +90 1.2 npm run test-mutations
 - [x] +18 2.1 npm run test-rule
 - [x] +80 3.1 npm run test-loader
 - [x] +28 3.2 npm run test-loader-prime
# Info
If the test was partially completed, then it is considered not completed.
If the one test was not completed, then the subsequent ones are considered not completed.

# Forfeits
-100% of max task score Fails: npm run test-integrity
-30% of max task score Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
-20 No separate development branch
-20 No Pull Request
-10 Pull Request description is incorrect
-20 Less than 3 commits in the development branch, not including commits that make changes only to Readme.md or similar files (tsconfig.json, .gitignore, .prettierrc.json, etc.)

## How to test the "Graphql"
### Tasks:
1. Add logic to the graphql endpoint: ./src/routes/graphql.  
Constraints and logic for gql queries should be done based on restful implementation.  
   1.1. npm run test-queries  
   1.2. npm run test-mutations    
2. Limit the complexity of the graphql queries by their depth with [graphql-depth-limit](https://www.npmjs.com/package/graphql-depth-limit) package.  
   Use value "5" for package.  
   2.1. npm run test-rule  
3. Solve `n+1` graphql problem with [dataloader](https://www.npmjs.com/package/dataloader).  
   You can use only one "findMany" call per loader to consider this task completed.  
   3.1. npm run test-loader  
   3.2. npm run test-loader-prime  

Steps to get started:
1. Install dependencies: npm ci
2. Create .env file (based on .env.example): ./.env
3. Create db file: ./prisma/database.db
4. Apply pending migrations: npx prisma migrate deploy
5. Seed db: npx prisma db seed
6. Start server: npm run start
