const express = require('express');

const router = express.Router();

//@route post api/labs
//desc  create a lab
router.post("/", (req, res) => { 
    const lab = req.body.labName
    console.log(lab);
    
})
//@route labs api/labs/
//desc  get labs
router.get('/', async (req, res) => {
    try {
        const labs = await lab.find().sort({ date: -1 });
        return res.json(labs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;