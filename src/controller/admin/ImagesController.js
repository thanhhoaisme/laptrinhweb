
const database = require('../../config/db');
const path = require('path');
const pool = database.pool;
// Endpoint để lấy danh sách sách

// Endpoint để lấy hình ảnh sách
exports.getBookImage = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      console.log("Received bookId:", bookId);

      const client = await pool.connect();
      const result = await client.query('SELECT ImagePath FROM books WHERE BookID = $1', [bookId]);
      client.release();

      if (result.rows.length === 1) {
          console.log("Query result:", result.rows);
          const imagePath = result.rows[0].imagepath;
          console.log("Image Path from database:", imagePath);

          if (imagePath) {
            const fullImagePath = path.join(__dirname, '..', '..', '..', 'picture', imagePath);
              console.log("Full Image Path:", fullImagePath);
              res.sendFile(fullImagePath);
          } else {
              res.status(404).send('Không tìm thấy ảnh hoặc đường dẫn ảnh không hợp lệ.');
          }
      } else {
          console.log("Không tìm thấy sách hoặc tìm thấy nhiều hơn một sách.");
          res.status(404).send('Không tìm thấy sách.');
      }
  } catch (err) {
      console.error('Lỗi database:', err);
      res.status(500).send('Lỗi server.');
  }
  };



