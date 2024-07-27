const { pool } = require('../db');
const bcrypt = require('bcrypt');

const hashExistingPasswords = async () => {
    try {
        const result = await pool.query('SELECT * FROM users');
        for (const user of result.rows) {
            if (!user.password.startsWith('$2b$')) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
            }
        }
        console.log('Passwords hashed successfully');
    } catch (error) {
        console.error('Error hashing passwords:', error);
    } finally {
        pool.end();
    }
};

hashExistingPasswords();
