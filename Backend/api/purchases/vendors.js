const express = require('express');

const router = express.Router();

//@route post api/vendors
//desc  create a vendor
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

//@route for search vendor by id
//create quotation and link with the indent
//@route for delete quotation



//@route for send indent
//@route for delete indent


