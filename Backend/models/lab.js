

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labSchema = new Schema({
    labName: String ,
    staff : { type: Schema.Types.ObjectId, ref: "User", required: true }
})

const Lab = mongoose.model("Lab",labSchema)

module.exports = Lab;