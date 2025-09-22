const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    data: Date,
    items: Array(any),
    status: Number
});

const Order = mongoose.model("orders", orderSchema); 
module.exports = Order;