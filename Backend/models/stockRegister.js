const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const stockSchema = new Schema({
    item: String,
    receivedFrom: { type: String, required: true },
    date: { type: Date, default: Date.now() },//date of the transaction
    unitPrice: Number, //quantity received
    invoice: String,  //invoice number if any
    numberOfUnits: { type: Number, required: true },   //total quantity received for this item
    category: String,

    //we have to  logic multiply number of units and unit price and update the totalPrice
    //we have to  logic multiply number of units and QuantityReceived  and update the balance
    quantityType: { type: String, required: true },
    quantityPerUnit: { type: Number, default: 0},
    //  amount: Number,
    duringIssue : { type: Number, default: 0 },
    availableBalance: { type: Number, default: 0 }
});






module.exports = ToCentral = mongoose.model('ToCentral', stockSchema);  







