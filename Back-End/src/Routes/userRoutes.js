const express = require('express');
const router = express.Router();
const { getUsers, getUserByIdHandler, createUserHandler } = require('../Handlers/userHandlers');
const authenticateToken = require('../authenticateToken/authenticateToken')
router.get('/users', getUsers);
router.get('/users/:id', getUserByIdHandler);
// router.post('/users', createUserHandler);
router.post('/users', authenticateToken, createUserHandler);
module.exports = router;
