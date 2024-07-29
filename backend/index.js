const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const productRouter = require('./routes/products');
const userRouter = require('./routes/users');
const cartRouter = require('./routes/cart');

require("dotenv").config();
const { PORT, DB_URI } = process.env;

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['https://e-commerce-frontend-t2w9.onrender.com', 'https://e-commerce-admin-zwl7.onrender.com', 'http://localhost:5173', 'http://localhost:3000']
}));

const connectToDb = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected to Database");
    } catch (error) {
        throw error;
    }
}


app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter)

app.listen(PORT, (error) => {
    connectToDb();
    if (!error) {
        console.log(`Server running on port ${PORT}`);
    }
    else {
        console.log("Error: " + error)
    }
})
