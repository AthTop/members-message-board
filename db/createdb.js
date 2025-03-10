const { Client } = require("pg");
require("dotenv").config();
const fs = require("fs");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (255),
    firstName VARCHAR (255),
    lastName VARCHAR (255),
    password_hash VARCHAR (255),
    member BOOLEAN,
    admin BOOLEAN  
);

CREATE TABLE IF NOT EXISTS message (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR (255),
  text VARCHAR (255),
  posted TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users_message (
  users_id INTEGER REFERENCES users(id),
  message_id INTEGER REFERENCES message(id) ON DELETE CASCADE,
  CONSTRAINT pk_users_message PRIMARY KEY(users_id, message_id) 
);

`;

const DROP = `
  DROP TABLE users, message, users_message;
`;

const sqlSession = fs.readFileSync(
  "node_modules/connect-pg-simple/table.sql",
  "utf-8"
);

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.query(sqlSession);
  await client.end();
  console.log("done");
}

main();
