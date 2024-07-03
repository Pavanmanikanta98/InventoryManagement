

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new  Schema({
    name: { type: String, required: true }, 
     email: String,
     password: { type: String, required: true },
     phone : String,
     position : { type: String, required: true },
})

const User = mongoose.model("User",userSchema)

module.exports = User;