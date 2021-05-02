const { changeNumberToString, changePriceToString_Products } = require('../functions/price.function')
// const {removeDuplicate} = require('../functions/tools.function')
const Admins = require('../models/admins.model')
const ProductsModel = require('../models/Products.model')
const OrdersModel = require('../models/Orders.model')
const Orders = require('../models/Orders.model')


// const bcrypt = require('bcryptjs')
// const Products = require('../models/Products.model')
// const a = async () => {
//     const password = await bcrypt.hash("PhamThanhDat12a7", 8)
//     console.log(password)
// }
// a();

module.exports.login = (req, res, next) => {
    res.render('./admin/login')
}

module.exports.checkLogin = async (req, res, next) => {

    try {
        const { name, password } = req.body
        const admin = await Admins.findByCredentials(name, password)

        if (!admin) {
            res.redirect('/admin/login')
        } else {
            const token = await admin.generateAuthToken()

            res.cookie('Authorization', token, {
                signed: true
            });

            res.redirect('/admin')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
module.exports.index = async (req, res, next) => {
    let AdobeProducts = await ProductsModel.find({ category: "Adobe" });
    let OfficeProducts = await ProductsModel.find({ category: "Office" });
    let SecurityProducts = await ProductsModel.find({ category: "Security" });
    let WindowProducts = await ProductsModel.find({ category: "Window" });
    let GoogleProducts = await ProductsModel.find({ category: "Google" });
    let CloudProducts = await ProductsModel.find({ category: "Cloud" });

    AdobeProducts = changePriceToString_Products(AdobeProducts)
    OfficeProducts = changePriceToString_Products(OfficeProducts)
    SecurityProducts = changePriceToString_Products(SecurityProducts)
    WindowProducts = changePriceToString_Products(WindowProducts)
    GoogleProducts = changePriceToString_Products(GoogleProducts)
    CloudProducts = changePriceToString_Products(CloudProducts)


    res.render('admin/', {
        AdobeProducts,
        OfficeProducts,
        SecurityProducts,
        WindowProducts,
        GoogleProducts,
        CloudProducts,
    })
}

module.exports.orders = async (req, res, next) => {
    let Orders = await OrdersModel.find()
    Orders = [...Orders].map(({ _doc }) => {
        let time = _doc.start_at;
        let date = time.getDate();
        let month = time.getMonth() + 1;
        let year = time.getFullYear();

        date = date > 9 ? `${date}` : `0${date}`
        month = month > 9 ? `${month}` : `0${month}`
        const result = `${date}/${month}/${year}`;

        const totalPrice = changeNumberToString(_doc.totalPrice)
        return { ..._doc, start_at: result, totalPrice: totalPrice }
    })


    res.render('admin/orders', {
        Orders: Orders.reverse(),
        page: 'index',

    })
}


module.exports.detailsOrder = async (req, res, next) => {
    const { orderID } = req.params
    const Order = await OrdersModel.findOne({ orderID: orderID })

    const time = Order.start_at;
    let date = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();

    date = date > 9 ? `${date}` : `0${date}`
    month = month > 9 ? `${month}` : `0${month}`
    const start_at = `${date}/${month}/${year}`;
    const totalPrice = changeNumberToString(Order.totalPrice)

    let result = { ...Order._doc }
    result = { ...result, start_at: start_at, totalPrice: totalPrice }

    res.render('admin/orderDetail', {
        Order: result,
        page: 'orderDetail'
    });
}

module.exports.updateOrderStatus = async (req, res, next) => {
    const { orderID } = req.params;
    const { newStatus } = req.body
    const filter = { orderID: orderID }
    await OrdersModel.updateOne(filter, { status: newStatus })
    res.send(`${orderID} đã được cập nhật thành "${newStatus}"`)
}



module.exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    await ProductsModel.deleteOne({ _id: id })
    res.send(`${id} đã bị xoá`);
}

module.exports.deleteOrder = async (req, res, next) => {
    const { id } = req.params;
    await OrdersModel.deleteOne({ orderID: id })
    res.send(`đơn hàng ${id} đã bị xoá`)
}

module.exports.addProduct = async (req, res, next) => {
    const { product } = req.body;
    await ProductsModel.create(product)
    res.redirect(`/admin`)
}




module.exports.addProductIndex = async (req, res, next) => {
    res.render('admin/addProduct')
}

module.exports.addProduct = async (req, res, next) => {
    let errors = [];
    const categoryList = ["Adobe", "Office", "Security", "Window", "Google", "Cloud"]
    const { name, category, image, price, title, p1, p2, p3, p4 } = req.body

    if (name.length == 0) {
        errors.push("Tên sản phẩm không hợp lệ")
    }

    if ((category.length == 0) || (categoryList.indexOf(category) < 0)) {
        errors.push("Loại sản phẩm không hợp lệ")
    }

    if (image.length == 0) {
        errors.push("Chưa có link ảnh")

    }

    if (price.length == 0) {
        errors.push("Giá không hợp lệ")

    }

    if (title.length == 0) {
        errors.push("Tiêu đề mô tả không hợp lệ")
    }


    if (errors.length > 0) {
        res.render('admin/addProduct', {
            errors: errors
        })
    } else {

        const p1_li = p1.length > 0 ? `<li>${p1}</li>` : ``
        const p2_li = p2.length > 0 ? `<li>${p2}</li>` : ``
        const p3_li = p3.length > 0 ? `<li>${p3}</li>` : ``
        const p4_li = p4.length > 0 ? `<li>${p4}</li>` : ``

        const mtsp = `<p><strong>${title}</strong></p> <ul>${p1_li} ${p2_li} ${p3_li} ${p4_li} </ul>`
        const Product = {
            name,
            category,
            img: [image],
            price: parseInt(price),
            mtsp,
        }

        await ProductsModel.create(Product)


        res.redirect('/admin')
    }



}


module.exports.updateProductIndex = async (req, res, next) => {
    const { id } = req.params;

    const Product = await ProductsModel.findOne({ _id: id })

    let mtsp = Product.mtsp
    let titleIndex1 = mtsp.indexOf('<strong>') + 8
    let titleIndex2 = mtsp.indexOf('</strong>')

    let p1_i1 = mtsp.indexOf("<li>") + 4
    let p1_i2 = mtsp.indexOf("</li>")


    let p2_i1 = mtsp.indexOf("<li>", p1_i1 + 1) + 4
    let p2_i2 = mtsp.indexOf("</li>", p1_i2 + 1)

    let p3_i1 = mtsp.indexOf("<li>", p2_i1 + 1) + 4
    let p3_i2 = mtsp.indexOf("</li>", p2_i2 + 1)

    let p4_i1 = mtsp.indexOf("<li>", p3_i1 + 1) + 4
    let p4_i2 = mtsp.indexOf("</li>", p3_i2 + 1)


    const title = mtsp.slice(titleIndex1, titleIndex2)
    const p1 = mtsp.slice(p1_i1, p1_i2)
    const p2 = mtsp.slice(p2_i1, p2_i2)
    const p3 = mtsp.slice(p3_i1, p3_i2)
    let p4 = mtsp.slice(p4_i1, p4_i2)
    p4 = p4 === p3 ? "" : p4



    res.render('admin/updateProduct', {
        Product,
        title,
        p1,
        p2,
        p3,
        p4
    })

}

module.exports.updateProduct = async (req, res, next) => {

    const { id } = req.params

    let errors = [];
    const categoryList = ["Adobe", "Office", "Security", "Window", "Google", "Cloud"]
    const { name, category, image, price, title, p1, p2, p3, p4 } = req.body

    if (name.length == 0) {
        errors.push("Tên sản phẩm không hợp lệ")
    }

    if ((category.length == 0) || (categoryList.indexOf(category) < 0)) {
        errors.push("Loại sản phẩm không hợp lệ")
    }

    if (image.length == 0) {
        errors.push("Chưa có link ảnh")

    }

    if (price.length == 0) {
        errors.push("Giá không hợp lệ")

    }

    if (title.length == 0) {
        errors.push("Tiêu đề mô tả không hợp lệ")
    }


    if (errors.length > 0) {

        res.render('admin/updateProduct', {
            errors: errors,
            Product: {
                name, category, img: [image], price
            },
            title,
            p1,
            p2,
            p3,
            p4
        })
    } else {

        const p1_li = p1.length > 0 ? `<li>${p1}</li>` : ``
        const p2_li = p2.length > 0 ? `<li>${p2}</li>` : ``
        const p3_li = p3.length > 0 ? `<li>${p3}</li>` : ``
        const p4_li = p4.length > 0 ? `<li>${p4}</li>` : ``

        const mtsp = `<p><strong>${title}</strong></p> <ul>${p1_li} ${p2_li} ${p3_li} ${p4_li} </ul>`
        const Product = {
            name,
            category,
            img: [image],
            price: parseInt(price),
            mtsp,
        }

        await ProductsModel.findByIdAndUpdate(id, Product)

        res.redirect('/admin')
    }

}

