require("dotenv").config();
const pg = require("pg");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "pg_demo.sql");
const sql = fs.readFileSync(filePath).toString();
const config = {
  user: "postgres",
  database: "pg_demo",
  password: "root",
  port: process.env.DB_PORT,
};

const pool = new pg.Pool(config);

pool.connect((err, client, done) => {
  if (err) {
    console.error(err);

    process.exit(1);
  }

  client.query(sql, (err, _) => {
    done();

    if (err) {
      console.error(err);

      process.exit(1);
    }

    process.exit(0);
  });
});

pool.end();
