const fs = require('fs');
const path = require('path');
const database = require('./config/db'); 

const imageFolderPath = path.join(__dirname, '../picture'); // Đường dẫn đến thư mục ảnh

console.log("Image folder path:", imageFolderPath); 

// Kiểm tra kết nối cơ sở dữ liệu
database.pool.query('SELECT 1')  
    .then(res => {
        console.log("Kết nối cơ sở dữ liệu thành công!");

        const files = fs.readdirSync(imageFolderPath);
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext); 
        });

        imageFiles.forEach(imageFile => {
            const imagePath = path.join(imageFolderPath, imageFile);
            const imageData = fs.readFileSync(imagePath);
            const query = {
                text: 'INSERT INTO images(ImageName, ImageData) VALUES($1, $2)',
                values: [imageFile, imageData]
            };

            database.pool.query(query) 
                .then(res => {
                    if (res.rowCount === 1) { 
                        console.log("Đã chèn ảnh thành công:", imageFile);
                    } else {
                        console.error("Lỗi khi chèn ảnh:", imageFile);
                    }
                })
                .catch(e => {
                    console.error("Lỗi khi chèn ảnh:", e);
                });
        });

    })
    .catch(err => {
        console.error("Lỗi kết nối cơ sở dữ liệu:", err);
    });