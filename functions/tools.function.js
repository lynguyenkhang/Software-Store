const ProductsModel = require('../models/Products.model')

const priceFunctions = require('./price.function')

const nodemailer = require('nodemailer')
const { models } = require('mongoose')

const config = { // config mail server
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.email, //Tài khoản gmail vừa tạo
        pass: process.env.passEmail //Mật khẩu tài khoản gmail vừa tạo
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
}


const removeDuplicate = arr => {
    return arr.filter((item, pos) => arr.indexOf(item) === pos)
}


const generateID = length => {
    var result = '';
    // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const getProductsBySession = (cart) => {
    const promise = new Promise((resolve, reject) => {
        let totalQuantity = 0;
        let totalPrice = 0;
        let result = [];
        cart.map(async ({ productID, volume }, index) => {
            const filter = { "_id": productID }
            let product = await ProductsModel.findOne(filter)
            if (!isNaN(product.price)) {
                totalPrice = totalPrice + (volume * product.price)
                product.price = priceFunctions.changeNumberToString(product.price)
            }
            totalQuantity = totalQuantity + volume

            product = { ...product._doc, volume, index }
            result = [...result, product]
        })

        let count = 0
        const render = () => {
            setTimeout(() => {
                count++;
                if (result.length === cart.length) {
                    console.log(`timing render cart: ${count} ms`)
                    resolve({
                        "editedCart": result.sort((a, b) => a.index - b.index),
                        "totalPrice": totalPrice,
                        "totalPriceStr": priceFunctions.changeNumberToString(totalPrice),
                        "totalQuantity": totalQuantity
                    })
                } else render()
            })
        }
        render()
    })
    return promise

}

const sendOrderToEmail = (receiver, contentHTML) => {

    const transporter = nodemailer.createTransport(config)

    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        subject: 'Test Nodemailer',
        // text: 'Your text is here', //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
    }

    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log('mess', 'Lỗi gửi mail: ' + err); //Gửi thông báo đến người dùng
            // res.redirect('/');
        } else {
            console.log('Message sent: ' + info.response);
            // req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
            // res.redirect('/');
        }
    });
}

const makeCartToEmail = cart => {

    // sendEmail
    let text = '';
    let contentHTML_top = `
<div style="margin: 30px 20px; display: flex; justify-content: center;">
    <div style="border: 1px solid #ddd; border-radius: 5px; width: 100%; max-width: 450px !important;">
        <div style="display: flex;align-items: center;border-bottom: 1px solid #ddd;padding: 8px 16px;background-color: #eee;border-radius: 5px 5px 0px 0px; font-size: 15px;">
            <span style="font-weight:bold">Danh sách sản phẩm </span>
        </div>
        <ul style="list-style-type: none !important; padding: 0px; margin: 10px 0px;">`


    cart.map(({ img, name, attribute, price, volume, category }) => {

        let attributeLine;
        switch (category) {
            case 'Apple Watch':
                attributeLine = `Kích cỡ: ${attribute}`; break;
            case 'Accessories':
            case 'AirPods':
                attributeLine = ''; break;
            default:
                attributeLine = `Màu: ${attribute}`; break;
        }


        text = text + `
            <li style="border-bottom: 1px solid #ddd;display: flex;padding: 15px 10px;">
                <img style="width: 80px;height: 80px;" src=${img}>
                <div style="margin: 0px 10px; font-size: 14px !important;">
                    <div style="text-decoration: none !important;color: black !important;word-wrap: break-word !important;">${name}</div>
                    <div style="margin-top: 3px;">${attributeLine}</div>
                    <div style="margin-top: 3px;">Đơn giá: ${price}</div>
                    <div style="margin-top: 3px;">Số lượng: ${volume}</div>
                </div>
            </li>`
    })
    text = text + `</ul></div></div>`
    return contentHTML_top + text
}

const makeOrderInforToEmail = (user, order) => {
    const { fullName, phoneNumber, email, address } = user
    const { orderID, date, totalPriceStr, paymentMethod, note } = order

    return `<div style="margin: 30px 20px; display: flex; justify-content: center;">
    <div style="border: 1px solid #ddd; border-radius: 5px; width: 100%; max-width: 450px !important;">
        <div style="display: flex;align-items: center;border-bottom: 1px solid #ddd;padding: 8px 16px;background-color: #eee;border-radius: 5px 5px 0px 0px; font-size: 15px;">
            <span style="font-weight:bold">Thông tin người đặt</span>
        </div>
        <ul style="list-style-type: none !important; padding: 0px; margin: 10px 0px;">
                    <li style="margin-top: 3px;">Họ và tên: ${fullName}</li>
                    <li style="margin-top: 3px;">Số điện thoại: ${phoneNumber}</li>
                    <li style="margin-top: 3px;">Email: ${email}</li>

                    <li style="margin-top: 3px;">Địa chỉ: ${address}</li>

        </ul>
        <div style="display: flex;align-items: center;border-bottom: 1px solid #ddd;padding: 8px 16px;background-color: #eee; font-size: 15px;">
            <span style="font-weight:bold">Thông tin đơn hàng</span>
        </div>	
        <ul style="list-style-type: none !important; padding: 0px; margin: 10px 0px;">
                    <li style="margin-top: 3px;">Mã đơn: ${orderID}</li>
                    <li style="margin-top: 3px;">Ngày: ${date}</li>

                    <li style="margin-top: 3px;">Tổng cộng<span style="font-style: italic; font-size: 12px">(chưa tính sản phẩm có giá liên hệ)</span>: ${totalPriceStr}</li>
                    <li style="margin-top: 3px;">Phương thức thanh toán: ${paymentMethod}</li>
                    <li style="margin-top: 3px;">Ghi chú: ${note}</li>

        </ul>
    </div>
</div>`
}


const checkPhoneNumber = phoneNumber => {
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (vnf_regex.test(phoneNumber)) {
        return true
    } else {
        return false
    }
}

module.exports.checkPhoneNumber = checkPhoneNumber;
module.exports.generateID = generateID;
module.exports.getProductsBySession = getProductsBySession;
module.exports.sendOrderToEmail = sendOrderToEmail;
module.exports.makeCartToEmail = makeCartToEmail;
module.exports.makeOrderInforToEmail = makeOrderInforToEmail;
module.exports.removeDuplicate = removeDuplicate;