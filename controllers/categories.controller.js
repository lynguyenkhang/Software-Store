

const ProductsModel = require('../models/Products.model')
const priceFunctions = require('../functions/price.function')


module.exports.index = async (req, res, next) => {
    const { categoryName } = req.params

    let Products = await ProductsModel.find({ category: categoryName });
    Products = priceFunctions.changePriceToString_Products(Products);
    res.render('./categories/index', { Products, categoryName })
}
