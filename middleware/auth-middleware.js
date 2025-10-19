require('dotenv').config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    const authHeader = req.header('Authorization');
    if(!authHeader){
        return res.status(401).send({
            error: "Access denied",
        });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>
    if(!token){
        return res.status(401).send({
            error: "Token missing",
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
        req.user = decode;  // important: req.user set karna
        next();
    } catch(err){
        return res.status(401).send({
            error: "Invalid token",
        });
    }
}

function isAdmin(req, res, next){
    if(req.user && req.user.isAdmin){
        next();
    } else {
        return res.status(403).send({
            error: "Forbidden",
        });
    }
}

module.exports = { verifyToken, isAdmin };
