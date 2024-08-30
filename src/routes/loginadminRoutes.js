
const express = require('express');
const router = express.Router();
// Missing or incorrect require for loginadminController
const loginadminController = require('../controller/admin/LoginadminController'); // This line might be missing or incorrect
router.post('/',loginadminController.loginadmin); // This will cause the error if loginadminController is undefined
module.exports = router;