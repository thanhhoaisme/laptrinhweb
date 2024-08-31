const express = require('express');
const router = express.Router();
const fillCustomerInfoController = require('../controller/client/RegisterController');

router.post('/',fillCustomerInfoController.saveCustomerInfo);

module.exports = router;