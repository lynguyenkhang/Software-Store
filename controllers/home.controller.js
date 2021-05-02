
const priceFunctions = require('../functions/price.function')
const ProductsModel = require('../models/Products.model')


module.exports.index = async (req, res, next) => {

    let AdobeProducts = await ProductsModel.find({ category: "Adobe" });
    let OfficeProducts = await ProductsModel.find({ category: "Office" });
    let SecurityProducts = await ProductsModel.find({ category: "Security" });
    let WindowProducts = await ProductsModel.find({ category: "Window" });
    let GoogleProducts = await ProductsModel.find({ category: "Google" });
    let CloudProducts = await ProductsModel.find({ category: "Cloud" });

    AdobeProducts = priceFunctions.changePriceToString_Products(AdobeProducts)
    OfficeProducts = priceFunctions.changePriceToString_Products(OfficeProducts)
    SecurityProducts = priceFunctions.changePriceToString_Products(SecurityProducts)
    WindowProducts = priceFunctions.changePriceToString_Products(WindowProducts)
    GoogleProducts = priceFunctions.changePriceToString_Products(GoogleProducts)
    CloudProducts = priceFunctions.changePriceToString_Products(CloudProducts)



    res.render('home', {
        AdobeProducts,
        OfficeProducts,
        SecurityProducts,
        WindowProducts,
        GoogleProducts,
        CloudProducts,
    })

    // res.render('home', {
    //     Banners: Banners,
    //     Categories: Categories,
    //     iPhone: iPhone,
    //     iPad: iPad,
    //     AppleWatch: AppleWatch,
    //     Macbook: Macbook
    // })
}