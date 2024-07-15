const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toLabSchema = new Schema({

    date: { type: Date, default: Date.now() },
    category: {type : String , required: true},
    item : {type : String , required: true},
    labName : {type : String , required: true},
    quantity : Number,
    numberOfUnits: { type: Number, required: true },   //total quantity received for this item
    issueTo : String,
    issueBy: String,
    duringIssue : { type: Number, default: 0 },
    availableBalance: { type: Number, default: 0 }
    
})

module.exports = ToLab = mongoose.model("ToLab",toLabSchema);

