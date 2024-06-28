const express = require('express');

const router = express.Router();

//@route post api/labs
//desc  create a lab
router.post("/", (req, res) => { 
    const user = req.body.userName
    console.log(user);
    
})
//@route labs api/labs/
//desc  get labs
router.get('/', async (req, res) => {
    try {
        const users = await vendor.find().sort({ date: -1 });
        return res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route search user by ID

module.exports = router;