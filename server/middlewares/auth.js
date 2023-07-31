const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]

        jwt.verify(token, JWT_SECRET, (err, phoneNumber) => {
            if(err) return res.status(498).json({error: 'Token is not valid'})

            req.phoneNumber = phoneNumber

            next()  
        })
    }
    catch(err){
        console.log(err)
        return res.status(401).json({ error: 'Authentication Failed' })
    }
}

module.exports = { verifyToken }