const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const ToLab = require('../../../models/toLabRegister');
const ToCentral = require('../../../models/stockRegister');
//from stock to lab
/*
router.post("/", async (req, res) => {
    const { item, quantity,  labName, category, numberOfUnits, issueTo, issueBy } = req.body;


    try {

        if (item === null || quantity === null || labName === null ||
            category === null || numberOfUnits === null || issueTo === null || issueBy === null || availableBalance) {
            return res.status(400).json({ msg: 'data insuff' });
        }
        
        const chem = await LabItem.findOne( {item }).sort({ date: -1 });
        if(!chem){
            //create obj for itemRelation
        }
        console.log(chem)
        let balance = 0;

        if (chem) {
            balance = chem ? chem.availableBalance + chem.existingBalance : 0;
            console.log(balance)
        }

        // Calculate the new balance
        let updatedBalance = quantity * numberOfUnits + balance;
       console.log(updatedBalance);

       
        
        const newIssue = new Tolab({
            item,
            quantity,
            labName,
            category,
            numberOfUnits,
            issueTo,
            issueBy,
            existingBalance: balance,
            updatedBalance,
            itemRelation: chem ? chem._id : null 
        });
        await newIssue.save();

        chem.availableBalance = updatedBalance;
        await chem.save()
        res.status(201).json({ message: "item issued to lab" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});*/
router.post('/', async (req, res) => {
    try {
        const { item, quantity, labName, category, numberOfUnits, issueTo, issueBy } = req.body;

        // Find the stock item
        const stockItem = await ToCentral.findOne({ item }).sort({ _id: -1 });
        if (!stockItem) {
            return res.status(404).json({ msg: 'Item not found in stock' });
        }

        // Check if the stock has enough available balance
        if (stockItem.availableBalance < quantity*numberOfUnits) {
            return res.status(400).json({ msg: 'Not enough stock available' });
        }
        
        const categoryObjectId = new mongoose.Types.ObjectId(category);
        // Create a new ToLab document
        const newToLab = new ToLab({ item, quantity, labName, category:categoryObjectId, numberOfUnits, issueTo, issueBy });
        await newToLab.save();

        // Update the available balance in the Stock collection
        stockItem.availableBalance -= quantity*numberOfUnits;
        await stockItem.save();

        res.json(newToLab);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//@route to get all issues to lab
// router.get('/', async (req, res) => {
//     try {
//         const issues = await ToLab.find().sort({ date: -1 });
//         return res.json(issues);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

//@route to delete an issue

router.delete('/', async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) return res.status(403).json({ message: "insufficient data" });

        const issue = ToLab.findById(id);
        if (issue === null) return res.status(403).json({ message: " issue not found" });
        await Tolab.findByIdAndDelete(id);

        return res.status(200).json({ message: "issue deleted" });

    } catch (er) {

        console.log(er.message);
        return res.status(500).json({ message: "server side error" })

    }
})



//@route to update an issue
router.patch('/', async (req, res) => {
    const { item, quantity, date, labName, category, numberOfUnits, issueTo, issueBy } = req.body;

    const { id } = req.body;

    try {
        let issue = await ToLab.findById(id);
        if (!issue) {
            return res.status(404).json({ message: "issue not found" });
        }
        if (item) issue.item = item;
        if (quantity) issue.quantity = quantity;
        if (date) issue.date = date;
        if (labName) issue.labName = labName;
        if (category) issue.category = category;
        if (numberOfUnits) issue.numberOfUnits = numberOfUnits;
        if (issueTo) issue.issueTo = issueTo;
        if (issueBy) issue.issueBy = issueBy;

        await issue.save();
    } catch (error) {
        console.log(er.message);
        return res.status(500).json({ message: "server side error" })
    }
})

module.exports = router;


