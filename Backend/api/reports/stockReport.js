const express = require('express');

const router = express.Router();


//All chem list


router.get('/', async(req, res )=>{
try {


    
    
} catch (err) {
    console.log(err.message);

    return res.status(500).json({message:"server side error"});
}

})

//search by chem

















module.exports = router;