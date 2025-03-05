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

const getUserById = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM users WHERE id = $1;
    `,
    [id]
  );
  return rows[0];
};

const getMessages = async () => {
  const { rows } = await pool.query(`
    SELECT message.*, username, firstName, lastName FROM message
          JOIN users_message ON message.id = message_id
          JOIN users ON users_id = users.id;
    `);
  return rows;
};

const setMember = async (id) => {
  await pool.query(
    `
    UPDATE users
    SET member = true
    WHERE id = $1;
    `,
    [id]
  );
};

const setAdmin = async (id) => {
  await pool.query(
    `
    UPDATE users
    SET admin = true
    WHERE id = $1;
    `,
    [id]
  );
};

const postMessage = async (title, message, userId) => {
  await pool.query(
    `
    WITH inserted_message AS(
      INSERT INTO message
      (title, text)
      VALUES ($1, $2)
      RETURNING id) 
    INSERT INTO users_message ( message_id, users_id)
    SELECT id, $3 FROM inserted_message
    `,
    [title, message, userId]
  );
};

const deleteMessageById = async (id) => {
  await pool.query(
    `
    DELETE FROM message
    WHERE id = $1;
    `,
    [id]
  );
};

module.exports = {
  pool,
  getUserByUsername,
  insertNewUser,
  getUserById,
  getMessages,
  setMember,
  setAdmin,
  postMessage,
  deleteMessageById,
};
