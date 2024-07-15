const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName: { type: String, required: true },
    unit : { type:String },
    description: {type : String},
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    //future things
    // vendors: [{ type: Schema.Types.ObjectId, ref: "Vendor" }], 
    // labs: [{ type: Schema.Types.ObjectId, ref: "Lab" }] 
});

const Item = mongoose.model("Item", itemSchema);

module.exports =  Item;