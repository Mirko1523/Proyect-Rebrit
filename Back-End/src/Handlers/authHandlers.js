const { authenticateUser } = require('../controllers/authController');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const result = await authenticateUser(email, password);
        if (result) {
            res.status(200).json({ message: 'Login successful', user: result.user, token: result.token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    loginUser,
};
