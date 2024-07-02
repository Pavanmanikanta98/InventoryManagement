
const express = require('express');
const User = require('../../models/users');

const router = express.Router();

//@route post api/labs
//desc  create a lab
router.post("/", async(req, res) => { 
    const { name, phone, email, passoword, position } = req.body;
    try {
        if(name === null || passoword === null || email === null || phone === null) {
            return res.status(403).json({message:"invalid data"});
        }
        

   const newUser = new User({
    name:name,
    //TODO :  password excryption
    passoword : passoword,
    email : email,
    phone : phone,
    position : position
       
   })

   await newUser.save();

   return res.status(201).json({message:"new user added"})



    } catch (er) {
        console.log(er);
        res.status(500).json({message:"server error"});
        
    }
    
})
//@route labs api/users/
//desc  get users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({ date: -1 });
        return res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route search user by ID
router.delete('/',async(req,res)=>{
    const { id } = req.body;
    try {

        if(! id ) return res.status(403).json({message:" invalid input"});

        const user = await User.findById(id);

        if(user == null ) return res.status(403).json({message:" user not found"});

        await User.findByIdAndDelete(id);
        return res.status(201).json({message:user})



        
    } catch (er) {
        console.log(er);
        return res.status(500).json({message:"server side error"});
        
    }
})

module.exports = router;