const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const challanSchema = new Schema({
    customer : String,
    challanType : String,
    date: { type: Date, default: Date.now() },
    vendor: String,
    item:[ { type: String }],
    description: [ { type: String }],
    quantity: [ { type: Number }],
    unitRate: [ { type: Number }],
    tax: [ { type: Number }],
    totalAmount: [ { type: Number }]
});


module.exports = Challan = mongoose.model("Challan", categorySchema);
