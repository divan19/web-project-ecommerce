const express = require('express');
require('dotenv').config()
require('./src/db/mongoose')

const app= express();

let cors = require('cors') 
app.use(cors())

const port = process.env.PORT || 4000;

require('./src/utils/populateBankAccount');
const addTransaction = require('./src/routes/addTransaction');
const checkBalance = require('./src/routes/checkBalance');
const validity =require('./src/routes/validTransaction');

const devRoutes = require('./src/routes/developmentRoutes')

app.use(express.json()); 
app.use('/add',addTransaction);
app.use('/balance',checkBalance);
app.use('/valid',validity);
app.use('/dev',devRoutes)




app.listen(port,()=>{
    console.log(`bank-api server started successfully on port ${port}`);
})