const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labSchema = Schema({
    labName: String    
})

export default Lab = mongoose.model("Lab",labSchema)