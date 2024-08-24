//"validator": "^13.12.0"
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./config/db');

// resolve CORS issue
app.use(cors());
// import routes
const loginRoutes = require ('./routes/loginRoutes');

// -- Fix cors issue - this line of code 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// FE send data to JSON 
app.use(express.json());
// use routes
app.use('/login', loginRoutes);
// Run Server 
app.listen(8989, () => {
    console.log('Server backend running on 8989');
});

