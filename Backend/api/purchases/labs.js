const express = require('express');

const router = express.Router();

const Lab = require('../../models/lab');

//@route post api/labs
//desc  create a lab
router.post("/", async (req, res) => { 
    const {labName, staff }= req.body
    // console.log(lab);
    try {

        if(labName === null) return res.status(403).json({message:"invalid input"});

         const lab =  new Lab({
             labName: labName,
             staff:staff
         })
          await lab.save();

          return res.status(201).json({message:"new lab added"})
        
    } catch (er) {
        console.log(er.message);
        return res.status(500).json({message:"server error"});
        
    }
    
})
//@route labs api/labs/
//desc  get labs
router.get('/', async (req, res) => {
    try {
        const labs = await Lab.find().sort({ date: -1 });
        return res.json(labs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//delte lab
router.delete('/:id',async (req,res) => {
  const id = req.params.id;
  try {
    const lab = await Lab.findById(id);
    if(!lab)  return res.status(404).json({message:"lab not found"});
      await Lab.findByIdAndDelete(id);

      return res.status(200).json({message:"lab deleted successfully"})
    
  } catch (er) {
    console.log(er.message);
    return res.status(500).send("server side error")
    
  }
})



module.exports = router;