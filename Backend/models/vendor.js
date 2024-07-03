const mongoose = require("mongoose")
const Schema = mongoose.Schema

const vendorSchema = new Schema({
    vendorName: String,
    vendorAddress: String,
    vendorMobile: Number
});

module.exports = Vendor = mongoose.model('Vendor', vendorSchema);