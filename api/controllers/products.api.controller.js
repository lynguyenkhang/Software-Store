

const CartsModel = require('../../models/Carts.model')

const toolsFunctions = require('../../functions/tools.function')

module.exports.getManyProducts = async (req, res) => {
    let sessionCart = req.body.cart
    if (!sessionCart) return;

    const cart = await toolsFunctions.getProductsFromSession(sessionCart)
    res.json(cart)
}


module.exports.changeVolume = async (req, res) => {
    const { position, calculation } = req.body
    const sessionID = req.signedCookies.sessionID
    const filter = { "sessionID": sessionID }
    let choosenSession = await CartsModel.findOne(filter)
    let newCart = [...choosenSession.cart];
    const currentVolume = newCart[position].volume

    switch (calculation) {
        case 'descrease':
            if (currentVolume === 1) break;
            newCart[position].volume = currentVolume - 1
            await CartsModel.findOneAndUpdate(filter, { "cart": newCart })
            break;

        case 'increase':
            newCart[position].volume = currentVolume + 1
            await CartsModel.findOneAndUpdate(filter, { "cart": newCart })
            break;

        default:
            console.log('error in calculation');
            break;
    }
    res.json({})
}


module.exports.deleteProductInCart = async (req, res) => {
    const { position } = req.body
    const sessionID = req.signedCookies.sessionID

    const filter = { "sessionID": sessionID }
    let { cart } = await CartsModel.findOne(filter)
    cart.splice(position, 1)
    await CartsModel.findOneAndUpdate(filter, { "cart": cart })
    res.json({})
}
