
const express = require('express');
const router = express.Router();
const loginadminController = require('../controller/admin/Images');  
router.post('/',loginadminController.loginadmin); 
module.exports = router;