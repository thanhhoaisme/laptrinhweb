
const express = require('express');
const router = express.Router();
const ImagesController= require('../controller/admin/ImagesController');  
router.get('/:bookId',ImagesController.getBookImage);  
module.exports = router;