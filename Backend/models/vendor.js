const mongoose = require("mongoose")
const Schema = mongoose.Schema

const vendorSchema = Schema({
    vendorName: String,
    vendorAddress: String,
    vendorMobile: Number
});

module.exports = Vendor = mongoose.model('Vendor', vendorSchema);