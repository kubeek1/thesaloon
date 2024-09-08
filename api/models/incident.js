const mongoose = require('mongoose');

const incidentSchema = mongoose.Schema({
    date: Date,
    description: String,
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    },
    exclude: Boolean
});

let Incident = mongoose.model("Incident", incidentSchema);
module.exports = Incident;