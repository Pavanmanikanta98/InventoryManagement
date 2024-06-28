const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addItem = Schema({
    itemName : String, 
    category: { type: Schema.Types.ObjectId, ref: "category" }//this

})

//link with vendors[],labs[]

export default Category = mongoose.model("Category",categorySchema)