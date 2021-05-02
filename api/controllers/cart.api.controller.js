const CartsModel = require('../../models/Carts.model')

module.exports.getOneCart = async function (req, res) {
    const sessionID = req.signedCookies.sessionID
    let cart = await CartsModel.find({ sessionID: sessionID });
    res.json(cart);
}

module.exports.updateOneCart = async function (req, res) {
    const sessionID = req.signedCookies.sessionID
    let { category, productID, volume } = req.body
    const filter = { "sessionID": sessionID }
    let newCart;

    let cart = await CartsModel.findOne(filter);
    if (cart === null) {
        newCart = await CartsModel.create({
            "sessionID": sessionID,
            "cart": [req.body]
        })
        console.log(`a new cart with sessionID: ${sessionID} is created`);
    } else {
        let newProduct = true;
        let updatedCart = cart.cart.map(item => {
            if (item.productID === productID) {
                newProduct = false;
                return {
                    "category": category,
                    "productID": productID,
                    "volume": item.volume + volume,
                }
            }
            return item
        })
        if (newProduct) updatedCart.push(req.body)
        newCart = await CartsModel.updateOne(filter, { cart: updatedCart })
        console.log(`cart with sessionID: ${sessionID} is updated `);
    }
    res.json(newCart)
}