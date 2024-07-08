const express = require('express');

const router = express.Router();

const Challan = require('../../models/challan');

router.post("/", async (req, res) => {
    const { customer,challanType,date,vendor,item,description,quantity,unitRate,tax,totalAmount } = req.body;

    try {
        if (customer === null || challanType === null || date === null || vendor === null ||
            item === null || description === null || quantity === null || unitRate === null || tax === null || totalAmount === null) {
            return res.status(400).json({ msg: 'data insuff' });
        }

        const challan = new Challan({
           customer,
           challanType,
           date,
           vendor,
           item,
           description,
           quantity,
           unitRate,
           tax,
           totalAmount
        });
        await challan.save();
        res.status(201).json({ message: "challan added" });
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
        
    }
    
})