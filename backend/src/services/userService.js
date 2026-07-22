const pool = require("../db/db");

async function getUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
}

async function createUser(user) {
    const { telegram_id, username, first_name, last_name } = user;

    const result = await pool.query(
        `INSERT INTO users (telegram_id, username, first_name, last_name)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (telegram_id)
         DO UPDATE SET
            username = EXCLUDED.username,
            first_name = EXCLUDED.first_name,
            last_name = EXCLUDED.last_name
         RETURNING *`,
        [telegram_id, username, first_name, last_name]
    );

    return result.rows[0];
}

const getUserByUsername = async (username) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );

    return result.rows[0] || null;
};

const getUserById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );

    return result.rows[0] || null;
};

module.exports = {
    getUsers,
    createUser,
    getUserByUsername,
    getUserById,
};