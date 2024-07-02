const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const indentSchema = new Schema({
    itemName: String,
    itemDescription :  {type:String , default:""},
    quantity: Number
})

module.exports = Indent = mongoose.model("Indent",indentSchema);