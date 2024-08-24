const express = require('express');
const router = express.Router();
const loginController = require('../controller/admin/LoginController');
router.post('/', loginController.login);
module.exports = router;