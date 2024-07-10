const express = require('express');

const router = express.Router();
const ToCentral = require('../../models/stockRegister');

//@route to issue item to lab
router.post("/", async (req, res) => {
    const { item,category, ReceivedFrom, date, unitPrice, invoice, numberOfUnits, quantityType, quantityPerUnit } = req.body;

    if (item === null ||category===null ||  ReceivedFrom === null|| date === null  || unitPrice === null ||
         invoice===null || numberOfUnits === null || quantityType === null || quantityPerUnit === null) {
        return res.status(400).json({ msg: 'data insuff' });
    }

    try {
        const newIssue = new ToCentral({
            item,
            category,
            ReceivedFrom,
            date,
            unitPrice,
            invoice,
            numberOfUnits,
            quantityType,
            quantityPerUnit
        });
        await newIssue.save();
        res.status(201).json({ message: "item issued to Central stock" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route to get all issues to central stock
router.get('/', async (req, res) => {
    try {
        const issues = await ToCentral.find().sort({ date: -1 });
        return res.json(issues);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route to delete an issue

router.delete('/', async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) return res.status(403).json({ message: "insufficient data" });

        const issue = ToCentral.findById(id);
        if (issue === null) return res.status(403).json({ message: " issue not found" });
        await ToCentral.findByIdAndDelete(id);

        return res.status(200).json({ message: "issue deleted" });

    } catch (er) {

        console.log(er.message);
        return res.status(500).json({ message: "server side error" })

    }
})


//@route to update an issue
router.patch('/', async (req, res) => {
    const { item,category, ReceivedFrom, date, unitPrice, invoice, numberOfUnits, quantityType, quantityPerUnit} = req.body;

    const { id } = req.body;

    try {
        let issue = await ToCentral.findById(id);
        if (!issue) {
            return res.status(404).json({ message: "issue not found" });
        }
        if (item) issue.item = item;
        if (category) issue.category = category;
        if (ReceivedFrom) issue.ReceivedFrom = ReceivedFrom;
        if (date) issue.date = date;
        if (unitPrice) issue.unitPrice = unitPrice;
        if (invoice) issue.invoice = invoice;
        if (numberOfUnits) issue.numberOfUnits = numberOfUnits;
        if (quantityType) issue.quantityType = quantityType;
        if (quantityPerUnit) issue.quantityPerUnit = quantityPerUnit;

        await issue.save();
    } catch (error) {
        console.log(er.message);
        return res.status(500).json({ message: "server side error" })
    }
})

module.exports = router;




















//report of all items added

//add item to stock



//need to crete stock reg schema