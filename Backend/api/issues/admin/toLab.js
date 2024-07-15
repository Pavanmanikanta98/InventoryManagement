const express = require('express');
const router = express.Router();
const ToLab = require('../../../models/toLabRegister');
const ToCentral = require('../../../models/stockRegister');
//from stock to lab

router.post('/', async (req, res) => {
    try {
        const { item, quantity, labName, category, numberOfUnits, issueTo, issueBy } = req.body;

        // Find the stock item
        const stockItem = await ToCentral.findOne({ item}).sort({ _id: -1 });
        if (!stockItem) {
            return res.status(404).json({ msg: 'Item not found in stock' });
        }

        // Check if the stock has enough available balance
        if (stockItem.availableBalance < quantity * numberOfUnits) {
            return res.status(400).json({ msg: 'Not enough stock available' });
        }


        const labItem = await ToLab.findOne({ item, labName }).sort({ _id: -1 });

        if(!labItem){
            const newToLab = new ToLab({
                item,
                quantity,
                labName,
                category,
                numberOfUnits,
                issueTo,
                issueBy,
                duringIssue: 0,
                availableBalance: numberOfUnits * quantity
            });
        }
        const mostRecentItem = await ToLab.findOne({ item ,labName}).sort({ _id: -1 });

        // Ensure the existing available balance is a valid number
        const existingBalance = mostRecentItem && mostRecentItem.availableBalance ? mostRecentItem.availableBalance : 0;
        // Create a new ToLab document
        const newToLab = new ToLab({
            item,
            quantity,
            labName,
            category,
            numberOfUnits,
            issueTo,
            issueBy,
            duringIssue: existingBalance,
            availableBalance: numberOfUnits * quantity + existingBalance
        });
        await newToLab.save();

        // Update the available balance in the Stock collection
        stockItem.availableBalance -= quantity * numberOfUnits;
        await stockItem.save();

        res.json(newToLab);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//@route to get all issues to lab
router.get('/', async (req, res) => {
    
    try {
        const issues = await ToLab.find().sort({ _id: -1 });
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

        const issue = ToLab.findById(id);
        if (issue === null) return res.status(403).json({ message: " issue not found" });
        await ToLab.findByIdAndDelete(id);

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


