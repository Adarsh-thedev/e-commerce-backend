require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//my routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

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
app.use("/api", userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> {
    console.log(`App is running on PORT ${PORT}`);
});