const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Q1w2e3r4t5",
    database: "dateinvite",
});

module.exports = pool;