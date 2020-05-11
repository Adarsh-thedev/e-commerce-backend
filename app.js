const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/tshirt', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex : true
})
.then(()=>{
    console.log('DB CONNECTED');
})
.catch(err=> console.log(err));

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`App is running on PORT ${PORT}`);
});