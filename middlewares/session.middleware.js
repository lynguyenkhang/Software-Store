const CartsModel = require('../models/Carts.model')
const toolsFunctions = require('../functions/tools.function');
const priceFunctions = require('../functions/price.function');

const { changeMetaTitleToSEO } = require('../functions/SEO');


module.exports.sessionID = async (req, res, next) => {
	if(!req.signedCookies.sessionID){
		res.cookie('sessionID', toolsFunctions.generateID(20), {
			signed: true
		});
		res.redirect('/');
		return;
	} else {
        const sessionID = req.signedCookies.sessionID
        const data = await CartsModel.find({ sessionID: sessionID});
        let sessionCart = {}

        if(data[0] !== undefined) {
            const cart = data[0].cart
            if(cart){
                sessionCart = await toolsFunctions.getProductsBySession(cart)
                sessionCart.editedCart = [...sessionCart.editedCart].map(product =>{
                  const price = product.price
                  let newPrice = isNaN(price) ? price : priceFunctions.changeNumberToString(price)
                  const result =  {...product, price: newPrice}
                  return result;
                })
            }
        }

        res.locals.meta = changeMetaTitleToSEO(req.originalUrl)
        res.locals.sessionCart = sessionCart
    }
    next()
}