

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const balSchema = new Schema({
    item: String ,
    related: String,
    balance : Number   
})

const Balance = mongoose.model("Balance",balSchema)

module.exports = Balance;