const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toClassSchema = new Schema({

    date: { type: Date, default: Date.now() },
    item : String,
    quantity : Number,
    period : String,
    issueTo : String,
    issueBy: String

})

module.exports = ToClass = mongoose.model("ToClass",toClassSchema)