const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')

const authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg : `Unauthorized`})
    }

    try {
        const payload = jwt.verify(token, process.env.secretKey);
        req.username = {userId : payload.userId, username : payload.username}
        next()        
    } catch (error) {
        console.log(error)
       return res.status(StatusCodes.FORBIDDEN).json({msg : `Unauthorized 2`})
    }
   
}
  module.exports = authMiddleware