const express = require('express');
const router = express.Router();

const ToLab = require('../../../models/toLabRegister');

router.get('/', async (req, res) => {
    const {token} = req.body;
    try {
        const decoded = jwt.verify(token,"your_secret_key");
        const userId = decoded.userId;
        const issues = await ToLab.findBYId(userId)
            .sort({ date: -1 })
            .select('date item quantity issueBy issueTo');
        return res.json(issues);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

