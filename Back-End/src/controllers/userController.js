const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getUsersFromDB = async () => {
    try {
        const result = await db.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        console.error('Error fetching users from DB:', error);
        throw new Error('Error fetching users from DB');
    }
};

const getUserByIdFromDB = async (id) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by ID from DB:', error);
        throw new Error('Error fetching user by ID from DB');
    }
};

const createUser = async (userInfo, currentUser) => {
     console.log('Current User:', currentUser);
    if (currentUser.user_level !== 'OWNER') {
        throw new Error('No tienes permisos para crear usuarios');
    }

    const { username, password, email, user_level } = userInfo;

    if (!username || !password || !email || !user_level) {
        throw new Error('Missing required fields');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await db.query(
            'INSERT INTO users (username, password, email, user_level) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, hashedPassword, email, user_level]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error creating user in DB:', err);
        throw new Error('Error creating user in DB');
    }
};

module.exports = {
    getUsersFromDB,
    getUserByIdFromDB,
    createUser
};
