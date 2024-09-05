const dotenv = require('dotenv');
dotenv.config(); 

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME, 
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT, 
  
});

// Log thông tin kết nối cơ sở dữ liệu
console.log("Database Host:", process.env.DATABASE_HOST); 
console.log("Database User:", process.env.DATABASE_USER); 
console.log("Database Password:", process.env.DATABASE_PASSWORD); 
console.log("Database Port:", process.env.DATABASE_PORT);

// Kiểm tra kết nối cơ sở dữ liệu (sử dụng async/await)
(async () => {
    try {
        await pool.connect();
        console.log('Database connected!');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); 
    }
})();

module.exports = pool; // Export đối tượng pool