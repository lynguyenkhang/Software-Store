
// const iPhoneModel = require('../models/iPhone.model')
// const iPadModel = require('../models/iPad.model')
// const AppleWatchModel = require('../models/AppleWatch.model')
// const MacbookModel = require('../models/Macbook.model')
// const AirPodsModel = require('../models/AirPods.model')
// const AccessoriesModel = require('../models/Accessories.model')
// const tsktModel = require('../models/tskt.model')

const ProductsModel = require('../models/Products.model')
const priceFunctions = require('../functions/price.function')



module.exports.index = async (req, res, next)  => {
    const { categoriesName, productsName } = req.params

    const Product = await ProductsModel.findOne({"category": categoriesName, name: productsName})
    const price = priceFunctions.changeNumberToString(Product.price)
    res.render('./products/index', {
        Product: { ...Product._doc, price}
    })
}