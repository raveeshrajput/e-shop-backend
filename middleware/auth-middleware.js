require('dotenv').config();   // env variables load karne ke liye
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

function verifyToken(req, res, next){
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).send({
            error: "Access denied",
        });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
        req.user=decode;
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