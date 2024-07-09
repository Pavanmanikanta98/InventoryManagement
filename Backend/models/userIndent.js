const mongoose = require('mongoose');
//const Category = require('./category');
const Schema = mongoose.Schema;

const indentSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    itemName: String,
    quantity: Number,
    unit : { type:String }
})

module.exports = UserIndent = mongoose.model("UserIndent",indentSchema);