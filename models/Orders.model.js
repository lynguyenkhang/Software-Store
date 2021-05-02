const mongoose = require("mongoose");

const orders_Schema = new mongoose.Schema({
    user: Object,
    orderID: String,
    note: String,
    cart: Array,
    totalPrice: Number,
    payment: String,
    start_at: {type: Date, default: Date.now},
    delivery_at: {type: Date},
    status: String,
});

const Orders = mongoose.model('Orders', orders_Schema, 'Orders');

module.exports = Orders;