const express = require('express');

const router = express.Router();

const Challan = require('../../../models/challan');


const { adminAuth } = require('../../middleaware/middleAware');

//@route to create a challan
router.post("/",adminAuth, async (req, res) => {

    try {
        const { customer, challanType, date, vendor, items } = req.body;
        if (!customer || !challanType || !date|| !vendor || !items || !Array.isArray(items)) {
            return res.status(400).json({ message: "data insuff" });
        }

        const challan = new Challan({
            customer,
            challanType,
            date,
            vendor,
            items
        });
        await challan.save();
        res.status(201).json({ message: "challan added" });

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');

    }

})

//@route to get all challans
router.get("/",adminAuth,  async (req, res) => {
    try {

        const challans = await Challan.find().sort({ date: -1 });
        return res.json(challans);

    } catch (error) {

        console.error(err.message);
        res.status(500).send('Server error');

    }
})

//@route to get a particular challan
router.get("/:id",adminAuth, async(req,res)=>{
    const {id} = req.params;
    try {
        const challan = await Challan.findById(id);
        if(!challan)  return res.status(404).json({message:"challan not found"}); 
        return res.status(200).json(challan);

        
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');

    }
    
})




//@route to delete a challan
router.delete('/',adminAuth, async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) return res.status(403).json({ message: "insufficient data" });

        const challan = Challan.findById(id);
        if (challan === null) return res.status(403).json({ message: " challan not found" });
        await Challan.findByIdAndDelete(id);

        return res.status(200).json({ message: "challan deleted" });

    } catch (er) {

        console.log(er.message);
        return res.status(500).json({ message: "server side error" })

    }
})

module.exports = router;


