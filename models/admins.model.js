const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken')
const mongoose = require('mongoose')

const admins_Scheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})




admins_Scheme.pre('save', async function(next){
    const admin = this
    if(admin.isModified('password')){
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})

admins_Scheme.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const admin = this
    const token = jwt.sign({_id: admin._id}, process.env.JWT_KEY, { expiresIn: process.env.EXPIRED_TIME })
    admin.tokens = admin.tokens.concat({token})
    await admin.save()
    return token
}


admins_Scheme.statics.findByCredentials = async (name, password) => {
    // Search for a user by email and password.
    const admin = await Admins.findOne({ name })
    if (!admin) {
        return false
    }
    const isPasswordMatch = await bcrypt.compare(password, admin.password)
    if (!isPasswordMatch) {
        return false
    }
    return admin
}

const Admins = mongoose.model('Admins', admins_Scheme, 'Admins')
module.exports = Admins