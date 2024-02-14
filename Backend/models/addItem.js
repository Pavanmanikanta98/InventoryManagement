const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addItem = Schema({
    itemName : String, 
    category: { type: Schema.Types.ObjectId, ref: "category" }//this
})

export default Category = mongoose.model("Category",categorySchema)