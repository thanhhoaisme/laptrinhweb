const database = require('../../config/db');

// Login func - POST request
exports.loginadmin = async (req, res) => {
    try {
      // Destructuring Assignment - take the username and password from the request body (data sent fronm Frontend)
      const { username, password } = req.body;
  
        // Database Query with prepared statement to prevent SQL injection         
        //query (para 1 = query code, para 2 = data input)

        //pool is "object" format -> query in object format ***
        const result = await database.pool.query({

            text: `SELECT admin_ID, Pass_Word 
            FROM dataloginadmin
            WHERE admin_ID = $1 AND Pass_Word = $2`,
        

            values: [username, password]
        });
  
        // Check if any results were found (successful login)
        // "result" after query 

        if (result.rows.length > 0) {
            const adminData = result.rows[0]; // Get the first row (successful login)
            delete adminData.Pass_word; // Remove password before sending the response (optional)

            res.status(200).json(adminData); 
            
        } 
        
        else {
            // Login failed, send JSON file error to Postman
            console.log('Login failed');
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } 
    
    catch (error) {
      console.error('Error during login:', error); // catch error to POSTMAN
      res.status(500).json({ message: 'Internal server error' }); 
    }
};