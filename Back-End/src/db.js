require('dotenv').config();
const { Pool } = require('pg');

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    DB_PORT
} = process.env;



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
