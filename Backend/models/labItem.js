const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labItemSchema  = new Schema({
    itemName:{type: String },
    existingBalance:{type: Number, default: 0},
    availableBalance:{type: Number,default:0}
})

const LabItem = mongoose.model("LabItem",labItemSchema);

module.exports = LabItem;