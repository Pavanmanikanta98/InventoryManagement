

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const utilitySchema = new Schema({
    labName: String ,
    incharge : String,
    toPeriod : String,
    chemical : { type: String, required: true },
    quantity:{ type: Number, required: true },
     usage : { type: Number, required: true }
})

const LabUtility = mongoose.model("LabUitlity",utilitySchema)

module.exports = LabUtility;