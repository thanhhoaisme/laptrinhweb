const express = require('express');
const router = express.Router();
const loginController = require('../controller/client/LoginController');
router.post('/:id', loginController.login);
module.exports = router;