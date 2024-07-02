

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quotationSchema = new Schema({
    itemName: String,
    Description :  {type:String , default:""},
    quantity: Number,
    price : String,
    indent : { type: Schema.Types.ObjectId, ref: "Indent" }
})

module.exports = Quotation = mongoose.model("Quotation",quotationSchema);