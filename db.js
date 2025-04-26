const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "rental_app",
    password: "andubadao123",
    port: 5434,
});

module.exports = pool;
