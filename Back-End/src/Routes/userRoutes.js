const express = require('express');
const router = express.Router();
const { getUsers, getUserByIdHandler, createUserHandler } = require('../Handlers/userHandlers');

router.get('/users', getUsers);
router.get('/users/:id', getUserByIdHandler);
router.post('/users', createUserHandler);

module.exports = router;
