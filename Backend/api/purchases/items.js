const express = require('express');

const router = express.Router();
const Category = require('../../models/category')
const Item = require('../../models/addItem')



//@route for add item
router.post("/", async (req, res) => {
    const { itemName, categoryId, unit, description } = req.body;

    if(!itemName || !categoryId)  return res.status(400).json({ msg: 'Item name and category id are required' });
    try {
        const newItem = new Item({
            itemName,
            category:categoryId,
            unit:unit,
            description:description
        })

        const item = await newItem.save();
        //might be somechanges are takeplace , while developing the frontend

           // finding the category to add item lisst
        const category = await Category.findById(categoryId);
           if (category) {
               category.list.push(item.itemName);
               await category.save();
           }
        return res.status(201).json(item )
    } catch (er) {
        console.log(er.message);
        res.status(500).send('Server error');
        
    }



})


//@route delete item

router.delete('/:id',async (req,res)=>{
    const id = req.params.id;
    try {

        const item = await Item.findById(id);
        if(!item){
            return res.status(404).json({message:'Item not found'});
    
        }
        await Item.findByIdAndDelete(id);
        const category = await Category.findById(item.category);
        if (category) {
            category.list = category.list.filter(itemRef => itemRef !== item.itemName);
            // category.list = category.list.filter(itemRef => itemRef.toString() !== id);
            await category.save();
        }
         return res.status(200).json({message:"item deleted successfully"})
        
    } catch (er) {
        console.log(err.message);
        res.status(500).send("server error");
    }
    
})

//@route search by id

router.get('/:id',async (req,res) => {
  const id = req.params.id;
  try {

    const item = await Item.findById(id);
    if(!item){
        return res.status(404).json({message:'Item not found'});

    }
     
    return res.status(200).json(item);
    
  } catch (er) {
    console.log(er.message);
    return res.status(500).json({message:"server side error"});
    
  }
})

//@route get all items
router.get("/", async (req, res) => {
    try {
        // Find all items and populate the category field
        const items = await Item.find().populate('category').exec();
        res.status(200).json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



//@route recent by count -- light

//@route update

router.put('/:id',async (req,res)=>{
    const { itemName, unit, description } = req.body;
    
    const id = req.params.id
    try {
         let item = await Item.findById(id)
        
         item.itemName = itemName;
         item.unit = unit,
         item.description = description

        item = await item.save();
        // console.log(categoryId);
        

        const category = Category.findById(item.category);
        category.list = category.list || [];
        if(!category) return res.status(404).json({message:"category not found but updated"});
       
        const index = category.list.findIndex(itemRef => itemRef === item);

        if(index !== -1){
            category.list[index] = item;
        }else{
            category.list.push(item);
        }
         return res.json(item)

        }

        
    catch (er) {
        console.log(er.message);
        return res.status(500).json({ message:"server side error"})
        
    }
})








module.exports = router;