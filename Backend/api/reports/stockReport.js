const express = require('express');

const router = express.Router();

const ToCentral = require('../../models/stockRegister');

//All chem list


router.get('/', async(req, res )=>{
try {
   
    const issues = await ToCentral.find().sort({ date: -1 });
      return res.status(200).json(issues);
    
    
} catch (err) {
    console.log(err.message);

    return res.status(500).json({message:"server side error"});
}

})

//search by chem

router.get('/:chemical',async (req,res )=>{
    try {

        const chemical = req.params.chemical;

        if(chemical === null)  return res.status(404).json({message:"invalid data"});

        const details = await ToCentral.find({ chemical  });

        if(details ===  null ) return res.status(404).json({ message:"related data not found "});

        return res.status(200).json(details);



        
    } catch (err) {
        console.log(er.message);
        return res.status(500).json({message:"server side error"});
    }
})


// TODO
///may be search by time (date)

















module.exports = router;