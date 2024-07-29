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
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, user_level } = req.body;
    
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = password ? await bcrypt.hash(password, saltRounds) : user.password;

        const updatedUserResult = await db.query(
            'UPDATE users SET username = $1, email = $2, password = $3, user_level = $4 WHERE id = $5 RETURNING *',
            [username, email, hashedPassword, user_level, id]
        );

        res.json(updatedUserResult.rows[0]);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
};

const userDisable = async (id) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('User not found');
        }

        const updatedUserResult = await db.query(
            'UPDATE users SET is_disabled = NOT is_disabled WHERE id = $1 RETURNING *',
            [id]
        );

        return updatedUserResult.rows[0];
    } catch (error) {
        console.error('Error disabling/enabling user:', error);
        throw new Error('Error disabling/enabling user');
    }
};



module.exports = {
    getUsersFromDB,
    getUserByIdFromDB,
    createUser,
    updateUser,
   userDisable
};
