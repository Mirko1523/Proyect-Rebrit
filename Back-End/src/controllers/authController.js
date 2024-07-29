const { query } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.ACCESS_SECRET_KEY; 

const authenticateUser = async (email, password) => {
    try {
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            if (user.is_disabled){
                return {error: 'user is disabled'}
            }
            const { password, ...userWithoutPassword } = user;

            // Generar token JWT
            const token = jwt.sign(userWithoutPassword, SECRET_KEY, { expiresIn: '1h' });

            return { user: userWithoutPassword, token };
        }
        return null;
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
};

module.exports = { authenticateUser };
