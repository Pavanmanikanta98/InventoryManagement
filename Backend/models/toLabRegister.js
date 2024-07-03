const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toLabSchema = new Schema({

    item : String,
    quantity : Number,
    Date: { type: Date, default: Date.now() },
    labName : String,
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    numberOfUnits: { type: Number, required: true },   //total quantity received for this item
    issueTo : String,
    issueBy: String
})

module.exports = ToLab = mongoose.model("ToLab",toLabSchema)