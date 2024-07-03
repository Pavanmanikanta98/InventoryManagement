const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const challanSchema = new Schema({
    customer : String,
    challanType : String,
    Date: { type: Date, default: Date.now() },
    vendor: String,
    
    
});


module.exports = Challan = mongoose.model("Challan", categorySchema);
