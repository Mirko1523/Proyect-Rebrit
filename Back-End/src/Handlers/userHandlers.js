const { getUsersFromDB, getUserByIdFromDB, createUser } = require('../controllers/userController');

const getUsers = async (req, res) => {
    try {
        const users = await getUsersFromDB();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users from DB:', error);
        res.status(500).json({ error: 'Error fetching users from DB' });
    }
};

const getUserByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdFromDB(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by ID from DB:', error);
        res.status(500).json({ error: 'Error fetching user by ID from DB' });
    }
};

const createUserHandler = async (req, res) => {
    try {
        const userInfo = req.body;
        console.log('User info received:', userInfo); 
        const newUser = await createUser(userInfo);
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error creating user in DB:', err);
        res.status(500).json({ error: 'Error creating user in DB' });
    }
};

module.exports = {
    getUsers,
    getUserByIdHandler,
    createUserHandler
};
