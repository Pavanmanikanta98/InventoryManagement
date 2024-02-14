const express = require('express');

const router = express.Router();

//@route post api/labs
//desc  create a lab
router.post("/", (req, res) => { 
    const vendor = req.body.vendorName
    console.log(vendor);
    
})
//@route labs api/labs/
//desc  get labs
router.get('/', async (req, res) => {
    try {
        const vendors = await vendor.find().sort({ date: -1 });
        return res.json(vendors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;