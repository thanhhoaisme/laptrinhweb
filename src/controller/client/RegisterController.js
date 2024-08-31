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
            Address_,
            Pass_Word
        } = req.body; 

        // 1. Data Validation 
        if (!validator.isEmail(Email)) {
            throw new Error('Invalid email address');
        }
        if (!validator.isMobilePhone(Phone_No)) { 
            throw new Error('Invalid phone number');
        }
        // ... other validations for Customer_Name, Address, Pass_Word (Add these as needed)

        // 2. Check for Existing Customer
        const existingCustomerResult = await client.query(
            'SELECT "customerid" FROM customers WHERE "phone_no" = $1 OR "email" = $2', 
            [Phone_No, Email]
        );
        let customerID;

        if (existingCustomerResult.rows.length > 0) {
            // 3. Existing Customer: Handle accordingly 
            throw new Error('Customer with this email or phone number already exists'); 
            // Or, if you want to allow updates:
            // customerID = existingCustomerResult.rows[0].CustomerID;
            // ... (Your update logic here) 

        } else {
            // 4. New Customer: Insert into 'customers'
            const newCustomerResult = await client.query(
                'INSERT INTO customers ("customer_name", "phone_no", "email", "address_") VALUES ($1, $2, $3, $4) RETURNING "customerid"',
                [Customer_Name, Phone_No, Email, Address_]
            );
            customerID = newCustomerResult.rows[0].customerid; 

            // 5. Insert into 'datalogincus' (No hashing - HIGHLY DISCOURAGED for production)
            await client.query(
                'INSERT INTO datalogincus ("customerid", "loginvalue", "pass_word", "logintype") VALUES ($1, $2, $3, $4), ($1, $5, $3, $6)',
                [customerID, Email, Pass_Word, 'email', Phone_No, 'phone']
            );
        }

        await client.query('COMMIT');
        res.status(201).json({ success: true, message: 'Customer registered successfully', customerID }); 

    } catch (err) {
        await client.query('ROLLBACK'); 
        console.error('Error:', err);
        res.status(500).json({ error: err.message || 'An error occurred' }); 
    } finally {
        client.release(); 
    }
};