const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = Schema({
    category: String, 
    list: [{ type: Schema.Types.ObjectId, ref: "Item" }] //this
})

export default Category = mongoose.model("Category",categorySchema)