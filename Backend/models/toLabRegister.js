const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toLabSchema = new Schema({

    date: { type: Date, default: Date.now() },
    category: {type : String , required: true},
    item : {type : String , required: true},
    labName : {type : String , required: true},
    quantity : Number,
    numberOfUnits: { type: Number, required: true },   //total quantity received for this item

  
    duringIssue : { type: Number, default: 0 },
    availableBalance: { type: Number, default: 0 },
    

    //availaavailableBalance:{type: Number,default:0}
    // existingBalance: { type: Number, default: 0 },
    // updatedBalance:{type:Number , default: 0},
    // itemRelation : { type: Schema.Types.ObjectId, ref: "LabItem"}
    issueTo: {
        type: String,
        required: true
      },
      issueBy: {
        type: String,
        required: true
      },
    qrCodeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fs.files',
        required: true
      }

})

module.exports = ToLab = mongoose.model("ToLab",toLabSchema);

