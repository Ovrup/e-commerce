const Product = require('../models/product');
const createError = require('../utils/error')

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (err) {
        res.status(500).json(createError(500, "Something went wrong"))
    }
}

const getProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.findOne({ id: id });
        res.status(200).json({
            success: true,
            data: product
        })
    } catch (err) {
        res.status(500).json(createError(500, "Something went wrong"))
    }
}

const createProduct = async (req, res, next) => {
    const allProducts = await Product.find({});
    const lastSavedProduct = allProducts.slice(-1);
    const id = lastSavedProduct[0].id + 1;
    req.body.id = id;
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.json({
        success: true,
        message: "Product has been added",
        name: savedProduct.name
    });
}

const deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: id });
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            name: deletedProduct.name
        })
    } catch (err) {
        res.status(500).json(createError(500, "Something went wrong"))
    }
}


module.exports = { getProducts, getProduct, createProduct, deleteProduct }