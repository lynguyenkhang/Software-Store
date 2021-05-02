const mongoose = require('mongoose')
const { pluckAttribute_AirPods } = require('../functions/pluck.function')


const products_Schema = new mongoose.Schema({
    name: String,
    category: String,
    img: Array,
    price: Number,
    mtsp: String,
})

const Products = mongoose.model('Products', products_Schema, 'Products');

module.exports = Products;


products_Schema.query.byAttribute = function(attribute, cb){
    this.exec((err, data) => {
        if(err) console.log(err)
        const product = pluckAttribute_Products(data, attribute)
        cb(product)
    })
}

