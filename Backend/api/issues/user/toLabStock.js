const express = require('express');
const router = express.Router();

const ToLab = require('../../../models/toLabRegister');

// router.get('/', async (req, res) => {
//     const {token} = req.body;
//     try {
//         const decoded = jwt.verify(token,"your_secret_key");
//         const userId = decoded.userId;
//         const issues = await ToLab.findBYId(userId)
//             .sort({ date: -1 })
//             .select('date item quantity issueBy issueTo');
//         return res.json(issues);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });


//@route to get all issues to lab
// @route to get all issues to lab
router.get('/:labName', async (req, res) => {
    try {
        const { labName } = req.params;
        console.log(labName);
        const issues = await ToLab.find({ labName  }).sort({ _id: -1 });
        return res.json(issues);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




//@route to get all items availabe balance
// @route to get all items available balance filtered by lab
router.get("/:labName/availability", async (req, res) => {
    try {
        const { labName } = req.params;

        const items = await ToLab.aggregate([
            {
                $match: { labName }  // Filter documents by lab
            },
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

module.exports = router;

