const express = require('express');
const router = express.Router();

const UserIndent = require('../../../models/userIndent');

const { generalAuth } = require('../../middleaware/middleAware');



//@route to send an indent to admin
router.post("/", generalAuth, async(req,res)=>{
    const {category ,itemName  , quantity , unit} = req.body;
    try {
        if(!category || !itemName || !quantity || !unit){
            return res.status(403).json({message:"insuff data"})
        }

        const newIndent = new UserIndent({
            category,
            itemName,
            quantity,
            unit
        })

        await newIndent.save();
        return res.status(201).json({messgae:"new indent sent"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server side error");
        
    }
})

//@route to get all indents
router.get("/", async(req,res)=>{
    try {
        const indents = await UserIndent.find().sort({ date: -1 });
        return res.json(indents);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


//@route to delete user indent
router.delete('/',async(req,res)=>{
    const {id}= req.body;
    try {
        const indent = await UserIndent.findById(id);
        if(!indent) return res.status(403).json({message:"user indent not found"});
        await UserIndent.findByIdAndDelete(id);
        return res.status(200).json({message:"user indent deleted"})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server side error"})
        
    }
})



module.exports = router;