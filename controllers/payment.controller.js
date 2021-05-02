const CartsModel = require('../models/Carts.model')
const OrdersModel = require('../models/Orders.model')
const toolFunctions = require('../functions/tools.function')



module.exports.index = async (req, res) => {
    res.render('./payment/index')
}

module.exports.makeOrder = async (req, res) => {
    const sessionID = req.signedCookies.sessionID
    const {
        fullName,
        phoneNumber,
        address,
        email,
        note,
        payment_method_COD,
    } = req.body
    let errors = [];

	if(!fullName.length) errors.push("Họ và tên không để trống");
	
	if(!phoneNumber.length) errors.push("Số điện thoại không để trống");
    if(!toolFunctions.checkPhoneNumber(phoneNumber)) errors.push("Số điện thoại không hợp lệ");


	if(!address.length) errors.push("Địa chỉ không để trống")

	if(!email.length) errors.push("Email không để trống");

    const sessionCart = await CartsModel.findOne({"sessionID": sessionID})
    if(!sessionCart) errors.push("Bạn chưa mua hàng")

    if(errors.length || !sessionCart){
        res.render("./payment/index",{
            errors: errors,
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address,
            email: email,
            note: note
        })
        return;
    }

    const orderID = toolFunctions.generateID(4)
    const user = {
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address,
        email: email,
    }

    const cartData = await toolFunctions.getProductsBySession(sessionCart.cart)
    const {editedCart, totalPrice, totalPriceStr} = cartData
    const paymentMethod = payment_method_COD ? "COD" : "Bank"

    const newOrder = await OrdersModel.create({
        user: user,
        orderID: orderID,
        note: note,
        cart: editedCart,
        totalPrice: totalPrice,
        payment: paymentMethod,
        status: "Chưa giao",
    })

    const {start_at} = newOrder
        let date = start_at.getDate();
            date =  date < 10 ? `0${date}` : date
        let month = start_at.getMonth() + 1;
            month =  month < 10 ? `0${month}` : month
        let year = start_at.getFullYear()


    await CartsModel.deleteOne({"sessionID": sessionID})

    const order = {
        orderID: orderID,
        totalPriceStr: totalPriceStr,
        date: `${date} / ${month} / ${year}`,
        paymentMethod: paymentMethod,
        note: note
    }

    res.render("./payment/confirm",{
        order: order,
        cart: editedCart
    })
}

