const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const itemSchema = new Schema({
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitRate: { type: Number, required: true },
    tax: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
  });
  
  const challanSchema = new Schema({
    customer: { type: String, required: true },
    challanType: { type: String, required: true },
    date: { type: Date, default: Date.now },
    vendor: { type: String, required: true },
    items: [itemSchema],
  });


module.exports = Challan = mongoose.model("Challan", challanSchema);
