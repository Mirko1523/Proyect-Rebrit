const express = require('express');
const { loginUser } = require('../Handlers/authHandlers');
const router = express.Router();

router.post('/login', loginUser);

module.exports = router;
