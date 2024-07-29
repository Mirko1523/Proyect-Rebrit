const express = require('express');
const router = express.Router();
const { getUsers, getUserByIdHandler, createUserHandler, disableUserHandler} = require('../Handlers/userHandlers');
const authenticateToken = require('../authenticateToken/authenticateToken');
const { updateUser} = require('../controllers/userController');


router.get('/users', getUsers);
router.get('/users/:id', getUserByIdHandler);
router.post('/users', authenticateToken, createUserHandler);
router.put('/users/:id', updateUser)
router.patch('/users/:id/disable', disableUserHandler);

module.exports = router;
