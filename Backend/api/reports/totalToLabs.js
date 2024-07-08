const express = require('express');
const router = express.Router();



const ToCentral = require('../../models/stockRegister');
const LabUtility = require('../../models/labUtility');

//route to get all report by search of labs
router.get('/:labname', async(req, res )=>{
    try {

        const labname = req.params.labname;
        if(labname === null ) return res.status(404).json({message:"invalid data"});
        
        const labs = ToCentral.find({ labname });

        if(labs === null ) return res.status(404).json({message:"details are not found "});

        return res.status(200).json(labs);


        
    } catch (er) {
        console.log(er.message);

        return res.status(500).json({message:"server side error"});
    }
})

//get class utilities


router.get("/:labname", async(req,res)=>{
    try {
        const labname = req.params.labname;
        if(labname === null ) return res.status(404).json({message:"invalid data "});

        const usages = await LabUtility.find({ labname }).sort({ date: -1 });

        return res.json(usages);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;