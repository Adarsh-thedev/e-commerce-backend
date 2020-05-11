const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex : true
})
.then(()=>{
    console.log('DB CONNECTED');
})
.catch(err=> console.log(err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> {
    console.log(`App is running on PORT ${PORT}`);
});