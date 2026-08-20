const jwt = require('jsonwebtoken');
const tokenBlackListModel = require('../models/tokenBlacklist.model')

async function authmiddleware(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message : "Unauthorized access"
        })
    }

    const checkBlackListtoken = await tokenBlackListModel.findOne({token});

    if(checkBlackListtoken){
        return res.status(401).json({
            message : "Token is already blacklist"
        })
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;

    next();
}
module.exports = {
    authmiddleware
}