const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/customers', require('./Customers/routes/auth'));

app.use('/owners', require('./Owners/routes/userRoutes'));

app.listen(3000, ()=>{
    console.log('Server is running on port 3000...');
})