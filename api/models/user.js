const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    login: String,
    password: String
});

let User = mongoose.model('User', userSchema);
module.exports = User;