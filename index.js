require('dotenv').config();

// Config:
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('publics'));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_ROSE_URI, { useNewUrlParser:  true, useUnifiedTopology: true});


// Module Middlewares
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const cookieParser = require('cookie-parser')
app.use(cookieParser(process.env.secretSessionID))


// Middlwares
const sessionMiddleware = require('./middlewares/session.middleware')
app.use(sessionMiddleware.sessionID)


// Routes
const homeRoute = require('./routes/home.route')
const categoriesRoute = require('./routes/categories.route')
const productsRoute = require('./routes/products.route')
const paymentRoute = require('./routes/payment.route')
const adminRoute = require('./routes/admin.route')

app.use('/', homeRoute)
app.use('/categories', categoriesRoute)
app.use('/products', productsRoute)
app.use('/thanhtoan', paymentRoute)
app.use('/admin',adminRoute)



// API
const cartApiRoute = require('./api/routes/cart.api.route')
const productsApiRoute = require('./api/routes/products.api.route')

app.use('/api/cart', cartApiRoute)
app.use('/api/products', productsApiRoute)



app.listen(port, function(req,res){
	console.log('port ' + port + ' runing...');
});



