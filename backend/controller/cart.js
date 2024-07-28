const User = require("../models/user");

const getUserCart = async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id });
    res.json({
        success: true,
        message: 'Successful',
        cart: user.cartData
    })
}

const addToCart = async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found.',
        })
    }
    const itemId = req.params.id;
    user.cartData[itemId] += 1;
    const updatedUser = await User.findByIdAndUpdate({ _id: user.id }, { cartData: user.cartData });
    res.status(200).json({
        success: true,
        message: 'Item added to cart'
    })
}

const removeFromCart = async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found.',
        })
    }
    const itemId = req.params.id;
    if (user.cartData[itemId] > 0) {
        user.cartData[itemId] -= 1;
    }
    const updatedUser = await User.findByIdAndUpdate({ _id: user.id }, { cartData: user.cartData });
    res.status(200).json({
        success: true,
        message: 'Item added to cart'
    })
}


module.exports = { getUserCart, addToCart, removeFromCart }