const dotenv = require('dotenv');
dotenv.config( ); // Đọc file .env

const { Pool } = require('pg');

// Sử dụng biến môi trường trong cấu hình Pool
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  
});

// Log 1  the database host after it's been retrieved from the environment variables
console.log("Database Host:", process.env.DATABASE_HOST); 
console.log("Database User:", process.env.DATABASE_USER); 
console.log("Database Password:", process.env.DATABASE_PASSWORD); 
console.log("Database Port:", process.env.DATABASE_PORT);

// check db connection
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Thoát khỏi tiến trình nếu không thể kết nối
  } else {
    console.log('Database connected!');
  }
});

// return "pool" in Object format to be used in other files - return a "pool" instance
module.exports = { pool };