const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    engine: String,
    year: Number,
    color: String,
    plate: String,
    availability: Boolean
});

let Car = mongoose.model('Car', carSchema);
module.exports = Car;