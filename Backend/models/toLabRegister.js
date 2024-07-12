const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toLabSchema = new Schema({

    item : String,
    quantity : Number,
    date: { type: Date, default: Date.now() },
    labName : String,
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    numberOfUnits: { type: Number, required: true },   //total quantity received for this item

    issueTo : String,
    issueBy: String,
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

