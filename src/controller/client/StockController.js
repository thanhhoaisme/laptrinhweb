const pool = require('../../config/db'); // Điều chỉnh đường dẫn nếu cần

exports.getProductById = async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const result = await pool.query('SELECT * FROM books WHERE BookID = $1', [bookId]);
        const product = result.rows[0];

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:',   
 error);
        res.status(500).json({ error:   
 'Internal server error' });
    }
};


//exports.updateCart = async (req, res) => {
  //const { bookId, quantity } = req.body;

  // Validate input using validator (you'll need to install it: npm i validator)
  //const validator = require('validator');
  //if (!validator.isInt(quantity.toString(), { min: 1 })) {
    //  return res.status(400).json({ error: 'Invalid quantity' });
  //}

  //try {
      // Logic to update cart in your database
      // ...

      // Example response (adjust as needed)
    //  res.json({ message: 'Cart updated successfully' });
  //} catch (error) {
    //  console.error('Error updating cart:', error);
      //res.status(500).json({ error: 'Internal server error'   
 //});
  //}
//};