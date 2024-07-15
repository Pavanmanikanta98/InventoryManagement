
const express = require('express');
const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { adminAuth } = require('../middleaware/middleAware');


const router = express.Router();

//@route post api/users
//desc  create a user
router.post("/signup",adminAuth, async(req, res) => { 
    const { name, phone, email, password, position } = req.body;
    try {

        
        if(name === null || !password  || email === null || phone === null || position === null ) {
            return res.status(403).json({message:"invalid data"});
        }

          // Hash the password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
        //   console.log(`password : ${hashedPassword}`)
        

   const newUser = new User({
    name:name,
    //TODO :  password excryption
    password : hashedPassword,
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


// route users api/users/signin
// desc authenticate the user and get token

router.post('/signin', async(req,res)=>{
    try {

      const { email, password} = req.body;

      if( !email || !password ) return res.status(404).json({ message:"insufficient data"});


       // Find the user by email
       const user = await User.findOne({ email });
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }

       const isMatch =  await bcrypt.compare(password,user.password);

       if( !isMatch) return res.status(403).json({message:"invlaid ccredentials"});

    //    console.log(isMatch);
    
          // Generate a token
          const payload = { userId: user._id , role : user.position };
          const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '24h' });

          res.set('Authorization', `Bearer ${token}`);

       return res.status(200).json({message:"login succesfully"});
        
    } catch (err) {
        console.log(err.message);

        return res.status(500).json({message:"sserver side error"})
    }
})







//@route labs api/users/
//desc  get users
router.get('/', adminAuth, async (req, res) => {
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