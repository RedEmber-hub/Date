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
         RETURNING *`,
        [telegram_id, username, first_name, last_name]
    );

    return result.rows[0];
}

module.exports = {
    getUsers,
};

module.exports = {
    getUsers,
    createUser,
};