const express = require('express');
const router = express.Router();

const ToClass = require ('../../../models/toClassRegister');


//@route to create a new issue to class
router.post('/',async(req,res)=>{
    const {date , item , quantity , period , issueTo , issueBy  } = req.body;
    try {
        const newIssue = new ToClass({
            date,
            item,
            quantity,
            period,
            issueTo,
            issueBy 
        })
        await newIssue.save();
        res.status(201).json({ message: "item issued to Class" });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
        
    }
})

//@route to get all issues 
router.get('/', async (req, res) => {
    try {
        const issues = await ToClass.find().sort({ date: -1 });
        return res.json(issues);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route to delete an issue
router.delete('/',async(req,res)=>{
    
    try {
        const {id} = req.body;
        ///console.log(id)
        const issue = await ToClass.findById(id);
        //console.log(issue)
        if(!issue) return res.status(403).json({message:"issue to class not found"});
        await ToClass.findByIdAndDelete(id);
        return res.status(200).json({message:"issue deleted"});

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;