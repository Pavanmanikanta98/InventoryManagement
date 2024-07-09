const express = require('express');

const router = express.Router();
const Category = require('../../models/category');

//@route post api/categories
//desc  create a category

  //add middleaware??
router.post("/", async (req, res) => {
    const { categoryName } = req.body;

    if (!categoryName) {
        return res.status(400).json({ msg: 'Category name is required' });
    }

    try {
        const newCategory = new Category({ category: categoryName, list: [] });
        const category = await newCategory.save();
        res.status(201).json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route labs api/categories/
//desc  get categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ date: -1 });
        return res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id',async(req,res) => {
    const id = req.params.id;

    try {
        const category = await Category.findById(id);
        if(!category) return res.status(404).json({message:"category not found "});

        await Category.findByIdAndDelete(id);
        return res.status(200).json({message: " category deleted successfully"});
        
    } catch (er) {
        console.log(er.message);
        return res.status(500).json({message:"server si8de error"})
        
    }
  
    
})




module.exports = router;