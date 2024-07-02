

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labSchema = Schema({
    labName: String ,
    staff : String   
})

const Lab = mongoose.model("Lab",labSchema)

module.exports = Lab;