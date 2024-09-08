const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    active: Boolean,
    settled: Boolean,
    startDate: Date,
    endDate: Date,
    additionalInformation: String,
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    }
});

let Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
