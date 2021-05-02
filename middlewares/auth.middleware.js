const jwt = require('jsonwebtoken')
const Admins = require('../models/admins.model')

const auth = async(req, res, next) => {
    const AuthorizationCookies = req.signedCookies.Authorization
    if(AuthorizationCookies){

        const token = AuthorizationCookies.replace('Bearer ', '')

        jwt.verify(token, process.env.JWT_KEY, async (err, data) => {
            if(err) {
                console.log(err)
                res.redirect('/admin/login')
            }
            else {
                const admin = await Admins.findOne({ _id: data._id })
                if (!admin) res.redirect('admin/login')
                else {
                    req.admin = admin
                    req.token = token
                    next()
                }
            }
        })


    }
    else res.redirect('/admin/login')
}
module.exports.auth = auth

