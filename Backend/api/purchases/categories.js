const express = require('express');

const router = express.Router();

//@route post api/categories
//desc  create a category
router.post("/", (req, res) => { 
    const category = req.body.categoryName
    console.log(category);
    
})

//@route labs api/categories/
//desc  get categories
router.get('/', async (req, res) => {
    try {
        const categories = await category.find().sort({ date: -1 });
        return res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router;