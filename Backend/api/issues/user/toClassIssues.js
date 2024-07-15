const express = require('express');
const router = express.Router();

const ToClass = require('../../../models/toClassRegister');
const ToLab = require('../../../models/toLabRegister');


//@route to create a new issue to class
router.post('/:labName', async (req, res) => {
    const { date, item, quantity, period, issueTo, issueBy } = req.body;
    const { labName } = req.params;


    try {
        const stockItem = await ToLab.findOne({ item, labName }).sort({ _id: -1 });
        if (!stockItem) {
            return res.status(404).json({ msg: 'Item not found in lab stock' });
        }

        // Check if the stock has enough available balance
        if (stockItem.availableBalance < quantity) {
            return res.status(400).json({ msg: 'Not enough stock available in lab' });
        }

        const newIssue = new ToClass({
            date,
            item,
            quantity,
            period,
            issueTo,
            issueBy,
        })
        await newIssue.save();

        stockItem.availableBalance -= quantity;
        await stockItem.save();

        res.status(201).json({ message: "item issued to Class" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');

    }
})

//@route to get all issues 
router.get('/', async (req, res) => {
    try {
        const issues = await ToClass.find().sort({ date: -1 });
        return res.json(issues);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route to delete an issue


router.delete('/',async(req,res)=>{
    
    try {
        const {id} = req.body;
        ///console.log(id)
        const issue = await ToClass.findById(id);
        //console.log(issue)
        if(!issue) return res.status(403).json({message:"issue to class not found"});

        await ToClass.findByIdAndDelete(id);
        return res.status(200).json({ message: "issue deleted" });

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;