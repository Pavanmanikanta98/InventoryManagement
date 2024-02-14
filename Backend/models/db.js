const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const itemSchema = new Schema({
    item: String,
    amount: Number,
});


export default  Item = mongoose.model('Item', itemSchema);

