const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const getUserByUsername = async (username) => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE username = $1;`,
    [username]
  );
  return rows[0];
};

const insertNewUser = async (username, firstName, lastName, password) => {
  await pool.query(
    `
    INSERT INTO users(username, firstName, lastName, password_hash)
    VALUES ($1, $2, $3, $4);
    `,
    [username, firstName, lastName, password]
  );
};

module.exports = { pool, getUserByUsername, insertNewUser };
