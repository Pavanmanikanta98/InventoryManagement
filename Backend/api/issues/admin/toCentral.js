const express = require('express');

const router = express.Router();
const ToCentral = require('../../../models/stockRegister');
//const Item = require('../../../models/addItem');


router.post('/', async (req, res) => {
    try {
        const { item, receivedFrom, unitPrice, invoice, numberOfUnits, category, quantityType, quantityPerUnit } = req.body;

        // Find the stock item or create a new one if it doesn't exist
        let stockItem = await ToCentral.findOne({ item }).sort({ _id: -1 });
        if (!stockItem) {
            stockItem = new ToCentral({
                 item,
                 receivedFrom, 
                 unitPrice, 
                 invoice, 
                 numberOfUnits, 
                 category, quantityType, 
                 quantityPerUnit, 
                 duringIssue : 0, 
                 availableBalance: numberOfUnits * quantityPerUnit 
            });
        } else {
            // Update the available balance
            const mostRecentItem = await ToCentral.findOne({ item }).sort({ _id: -1 });

            // Ensure the existing available balance is a valid number
            const existingBalance = mostRecentItem && mostRecentItem.availableBalance ? mostRecentItem.availableBalance : 0;
            stockItem = new ToCentral({
                 item, 
                 receivedFrom, 
                 unitPrice, 
                 invoice, 
                 numberOfUnits, 
                 category, 
                 quantityType, 
                 quantityPerUnit, 
                 duringIssue: existingBalance, 
                 availableBalance: (numberOfUnits * quantityPerUnit) + existingBalance }
            );

            // stockItem.availableBalance +=numberOfUnits*quantityPerUnit;

        }

        // Save the stock item
        await stockItem.save();
        res.json(stockItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//@route to get all items availabe balance
router.get("/availability", async (req, res) => {
    try {
       const items = await ToCentral.aggregate([
        {
            $sort: { item: 1, _id: -1 }
        },
        {
            $group: {
                _id: "$item",
                item: { $first: "$item" },
                availableBalance: { $first: "$availableBalance" }
            }
        }
    ]);

    // Map through the items to ensure all have availableBalance
    const itemBalances = items.map(item => ({
        item: item.item,
        availableBalance: item.availableBalance || 0
    }));

    res.json(itemBalances);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route to get all issues to central stock
router.get('/', async (req, res) => {
    try {
        const issues = await ToCentral.find().sort({ _id: -1 });
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
    const { item, category, receivedFrom, date, unitPrice, invoice, numberOfUnits, quantityType, quantityPerUnit } = req.body;

    const { id } = req.body;

    try {
        let issue = await ToCentral.findById(id);
        if (!issue) {
            return res.status(404).json({ message: "issue not found" });
        }
        if (item) issue.item = item;
        if (category) issue.category = category;
        if (ReceivedFrom) issue.receivedFrom = receivedFrom;
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