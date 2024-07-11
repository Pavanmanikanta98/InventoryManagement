const mongoose = require('mongoose');
//const Category = require('./category');
const Schema = mongoose.Schema;

const indentSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    itemName: String,
    itemDescription :  {type:String , default:""},
    quantity: Number,
    unit : { type:String }
})

module.exports = Indent = mongoose.model("Indent",indentSchema);