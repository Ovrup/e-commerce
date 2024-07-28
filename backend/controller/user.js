const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const createUser = async (req, res, next) => {
    const check = await User.findOne({ email: req.body.email });

    if (check) {
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        })
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const newUser = new User({
        ...req.body,
        password: hashedPassword,
        cartData: cart
    });

    const savedUser = await newUser.save();
    const data = {
        id: savedUser.id,
        name: savedUser.name
    }
    const token = jwt.sign(data, SECRET_KEY);
    res.status(200).json({
        success: true,
        message: 'User has been created',
        username: savedUser.name,
        token: token
    })
}

const login = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found!"
        })
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordCorrect) {
        return res.status(404).json({
            success: false,
            message: 'Incorrect password'
        })
    }

    const data = {
        id: user.id,
        username: user.name
    }

    const token = jwt.sign(data, SECRET_KEY);

    res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        token: token,
        username: user.name
    })
}

module.exports = { createUser, login }