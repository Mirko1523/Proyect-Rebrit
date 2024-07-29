const { getUsersFromDB, getUserByIdFromDB, createUser, userDisable } = require('../controllers/userController');

const validUserLevels = ['ADMIN', 'OWNER', 'USER'];

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
    const { username, password, email, user_level } = req.body;
    const currentUser = req.user; 

    console.log('Request body:', req.body);
    console.log('Current User:', currentUser);
    
    if (!validUserLevels.includes(user_level)) {
        return res.status(400).json({ message: 'Invalid user level' });
    }

    try {
        const newUser = await createUser({ username, password, email, user_level }, currentUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

const disableUserHandler = async (req, res) => {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const updatedUser = await userDisable(id);
        res.json(updatedUser);
    } catch (error) {
        console.error('Error disabling/enabling user:', error);
        res.status(500).json({ error: 'Error disabling/enabling user' });
    }
};


module.exports = {
    getUsers,
    getUserByIdHandler,
    createUserHandler,
    disableUserHandler
};
