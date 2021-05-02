const mongoose = require("mongoose");

const carts_Schema = new mongoose.Schema({
	sessionID: String,
	cart: Array,
});

const Carts = mongoose.model('Carts', carts_Schema, 'Carts');


module.exports = Carts;