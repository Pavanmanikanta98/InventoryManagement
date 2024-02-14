const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const indentSchema = new Schema({
    itemName: String,
    itemDescription :  {type:String , default:""},
    quantity: Number
})

export default Indent = mongoose.model("Indent",indentSchema);