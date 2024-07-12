
const express = require('express');
const LabUtility = require('../../models/labUtility');

const { adminAuth } = require('../middleaware/middleAware');
const router = express.Router();


//@route post period/chemname

router.post('/',adminAuth, async(req, res ) =>{

const { labName, incharge, toPeriod, chemical, quantity , usage  } = req.body;
try {

if( labName === null || incharge === null || toPeriod === null || quantity === 0  || usage === 0 || chemical === null ){
    
    return res.status(403).json({message:"insfficient data"});
}





 const newUsage = new LabUtility({
    labName,
    incharge,
    toPeriod,
    usage,
    chemical
    
 });
 const availableItem = await Tolab.findOne(item);
if(availableItem) {
    const remainBalance = availableItem.balance;
    availableItem.balance = remainBalance - usage;
}

 await newUsage.save();

return res.status(201).json(newUsage);

    
} catch (er) {
    console.log(er.message);
    return res.status(500).json({message:"server side error"});

}



})


// @route GET api/labUtilities/:labName
// @desc  Get all usage in a specific lab
router.get('/:labName',adminAuth, async (req, res) => {
    const labName = req.params.labName;

    try {
        const labUtilities = await LabUtility.find({ labName });
        if (labUtilities.length === 0) {
            return res.status(404).json({ message: "No chemicals found for this lab" });
        }
        res.status(200).json(labUtilities);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server side error" });
    }
});



//@route get chem by ID
router.get('/:chemical',adminAuth, async(req, res )=> {
    const chemical = req.params.chemical;
    try {

        if( chemical === null )  return res.status(404).json({message:"invalid info "});

        const usage = LabUtility.find({ chemical });

        if (usage.length === 0) {
            return res.status(404).json({ message: "No chemicals found for this lab" });
        }

        return res.status(200).json(usage);
     

        
    } catch (er) {

        console.log(er.message);
        return res.status(500).json({message:"server side error"});
    }
})

//roite delete by id


router.delete('/:id',adminAuth, async(req,res)=>{
    const id = req.params.id;
    try {

        if(id === null)  return res.status(404).json({message:"invalid id"});

        const data = await LabUtility.findById(id);
        if(data ===  null ) return res.status(404).json({message:"info not found "});
               
            await LabUtility.findByIdAndDelete(id);

            return res.status(200).json({message:"succuessfully deleted"});

        
    } catch (er) {
        console.log(er.message);
        return res.status(500).json({message:"server error"});
    }
})

//@route for all usages

router.get("/", adminAuth, async(req,res)=>{
    try {
        const usages = await LabUtility.find().sort({ date: -1 });
        return res.json(usages);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})




module.exports = router;
