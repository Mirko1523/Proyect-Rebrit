const { getUsersFromDB, getUserByIdFromDB, createUser } = require('../controllers/userController');

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

    console.log('Request body:', req.body); // Verificar el contenido del cuerpo de la solicitud
    console.log('Current User:', currentUser); // Verificar el usuario autenticado
    
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

module.exports = {
    getUsers,
    getUserByIdHandler,
    createUserHandler
};
