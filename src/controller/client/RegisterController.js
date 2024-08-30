const database = require('../../config/db');
const validator = require('validator');

exports.saveCustomerInfo = async (req, res) => {
    const client = await database.pool.connect();

    try {
        await client.query('BEGIN');
        const {
            Phone_No,
            Email,
            Customer_Name,
            Address,
        } = req.body;

        // --- Kiểm tra dữ liệu đầu vào ---
        if (!Phone_No || !Email || !Customer_Name || !Address || !Model_Car_ID) {
            return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
        }

        if (!validator.isEmail(Email)) {
            return res.status(400).json({ error: 'Email không hợp lệ' });
        }

        if (!validator.isMobilePhone(Phone_No, 'vi-VN')) {
            return res.status(400).json({ error: 'Số điện thoại không hợp lệ' });
        }
        // --- Kết thúc kiểm tra ---

        // Kiểm tra xem khách hàng đã tồn tại dựa trên Email hoặc Phone_No
        const existingCustomerResult = await client.query(
            'SELECT * FROM dataCUSTOMER WHERE Email = $1 OR Phone_No = $2', 
            [Email, Phone_No]
        );
        const existingCustomer = existingCustomerResult.rows[0];

        let customerId; // Biến để lưu trữ CustomerID

        if (existingCustomer) {
            // Nếu khách hàng đã tồn tại, cập nhật số giao dịch
            customerId = existingCustomer.customerid; // Lấy CustomerID từ kết quả truy vấn
            await client.query(
                'UPDATE dataCUSTOMER SET Number_Transaction = Number_Transaction + 1 WHERE CustomerID = $1', 
                [customerId]
            );
        } else {
            // Nếu khách hàng chưa tồn tại, thêm mới vào bảng
            const newCustomerResult = await client.query(
                'INSERT INTO dataCUSTOMER (Customer_Name, Phone_No, Email, Address, Number_Transaction) VALUES ($1, $2, $3, $4, 1) RETURNING CustomerID',
                [Customer_Name, Phone_No, Email, Address]
            );
            customerId = newCustomerResult.rows[0].customerid; // Lấy CustomerID từ kết quả truy vấn
        }

        // --- Tạo giao dịch mới ---
        const currentDate = new Date();
        const paymentDate = currentDate;
        const warrantyValidDate = new Date(currentDate);
        warrantyValidDate.setFullYear(warrantyValidDate.getFullYear() + 2);

        const lastTransactionIdResult = await client.query(
            'SELECT Transaction_ID FROM dataTRANSACTION ORDER BY Transaction_ID DESC LIMIT 1'
        );
        const lastTransactionId = lastTransactionIdResult.rows[0] ? lastTransactionIdResult.rows[0].transaction_id : 'T068';
        const nextTransactionId = 'T' + String(Number(lastTransactionId.slice(1)) + 1).padStart(3, '0');

        await client.query(
            'INSERT INTO dataTRANSACTION (Transaction_ID, CustomerID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [nextTransactionId, customerId, Model_Car_ID, currentDate, paymentDate, warrantyValidDate, 'deposited'] 
        );

        // --- Thêm data vào bảng dataACCOUNTING ---
        const depositPrice = 5000; // Cần logic xác định giá trị đặt cọc dựa trên Model_Car_ID

        const carPriceResult = await client.query('SELECT Price FROM dataCAR WHERE Model_Car_ID = $1', [Model_Car_ID]);
        const carPrice = carPriceResult.rows[0].price - depositPrice;

        await client.query(
            'INSERT INTO dataACCOUNTING (Transaction_ID, Transaction_Price, Deposit_Price) VALUES ($1, $2, $3)',
            [nextTransactionId, carPrice, depositPrice]
        );

        await client.query('COMMIT');
        res.status(201).json({ Transaction_ID: nextTransactionId });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error:', err);
        res.status(500).json({ error: 'Đã có lỗi xảy ra' });
    } finally {
        client.release();
    }
};