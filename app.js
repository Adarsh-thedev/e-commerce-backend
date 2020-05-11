require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex : true
})
.then(()=>{
    console.log('DB CONNECTED');
})
.catch(err=> console.log(err));

//my routes
app.use("/api", authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> {
    console.log(`App is running on PORT ${PORT}`);
});