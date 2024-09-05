const express = require('express');
const router = express.Router();
const stockController = require('../controller/client/StockController'); // Điều chỉnh đường dẫn nếu cần

// Lấy thông tin sản phẩm (bao gồm stock_quantity)
router.get('/products/:bookId', stockController.getProductById);

// Cập nhật giỏ hàng
//router.post('/cart/update', stockController.updateCart);

module.exports = router;