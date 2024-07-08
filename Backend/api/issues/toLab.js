const express = require('express');

const router = express.Router();
const Tolab = require('../../models/toLabRegister');
//from stock to lab

//issue item to lab
router.post("/", async (req, res) => {
    const { item, quantity, date, labName, category, numberOfUnits, issueTo, issueBy } = req.body;


    try {

        if (item === null || quantity === null || date === null || labName === null ||
            category === null || numberOfUnits === null || issueTo === null || issueBy === null) {
            return res.status(400).json({ msg: 'data insuff' });
        }
        const newIssue = new Tolab({
            item,
            quantity,
            date,
            labName,
            category,
            numberOfUnits,
            issueTo,
            issueBy
        });
        await newIssue.save();
        res.status(201).json({ message: "item issued to lab" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route to get all issues to lab
router.get('/', async (req, res) => {
    try {
        const issues = await Tolab.find().sort({ date: -1 });
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

        const issue = Tolab.findById(id);
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
        let issue = await Tolab.findById(id);
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

