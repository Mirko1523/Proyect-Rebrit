require('dotenv').config();
const { Pool } = require('pg');
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    DB_PORT
} = process.env;

console.log('DB_USER:', DB_USER);
console.log('DB_PASSWORD:', DB_PASSWORD);
console.log('DB_HOST:', DB_HOST);
console.log('DB_NAME:', DB_NAME);
console.log('DB_PORT:', DB_PORT);

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: parseInt(DB_PORT, 10),
    ssl: {
        rejectUnauthorized: false
    }
});

const query = (text, params) => pool.query(text, params);

module.exports = {
    query,
    pool,
};
