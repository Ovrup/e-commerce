const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const imageRouter = require('./routes/images');
const productRouter = require('./routes/products');
const userRouter = require('./routes/users');
const cartRouter = require('./routes/cart');

require("dotenv").config();
const { PORT, DB_URI } = process.env;

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173']
}));

const connectToDb = async () => {
    try {
        // Database connection with MongoDB
        await mongoose.connect(DB_URI);
        console.log("Connected to Database");
    } catch (error) {
        throw error;
    }
}

// Creating upload endpoint for images
app.use('/images', express.static('./upload/images'))

app.use('/api/user', userRouter);
app.use('/api/images', imageRouter);
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
