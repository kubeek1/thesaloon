const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: String,
    surname: String,
    address: String,
    email: String,
    phone: String
});

let Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;