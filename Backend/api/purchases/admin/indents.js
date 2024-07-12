const express = require('express');

const Indent = require('../../../models/indent');

const router = express.Router();

//@route for send indent
router.post('/', async (req, res) => {
    const { category,
        itemName,
        itemDescription,
        quantity,
        unit
    } = req.body;


    try {
        if (category === null ||
            itemName === null ||
            itemDescription === null ||
            quantity === null ||
            unit === null) {
            return res.status(404).json({ message: "insufficeinet data" });

        }

        const indent = new Indent({
            category: category,
            itemName: itemName,
            itemDescription: itemDescription,
            quantity: quantity,
            unit : unit
        });

        await indent.save();

        return res.status(201).json({ message: "new indent created" });




    } catch (er) {
        console.log(er.message);
        return res.status(500).json({ message: "server error" });
    }
})


//@route for delete indent

router.delete('/', async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) return res.status(403).json({ message: "insufficient data" });

        const indent = Indent.findById(id);
        if (indent === null) return res.status(403).json({ message: " indent not found" });
        await Indent.findByIdAndDelete(id);

        return res.status(200).json({ message: "indent deleted" });

    } catch (er) {

        console.log(er.message);
        return res.status(500).json({ message: "server side error" })

    }
})

//@route to get selected indent

router.get("/",async(req,res)=>{
    const {id}= req.body;
    try{
        if(id===null){
            return res.status(403).json({message:"insuff data"})
        }
        const indent = await Indent.findById(id)
        if(!indent){
            return res.status(404).json({message:'indent not found'});
        }
        return res.status(200).json({ indent });
    }
    catch(er){
        console.log(er.message);
        return res.status(500).json({ message: "server side error" })
    }
})

//@route to get all indents
router.get("/bulk", async(req,res)=>{
    try {
        const indents = await Indent.find().sort({ date: -1 });
        console.log(indents)
        return res.json(indents);
    } catch (er) {
        console.error(er.message);
        res.status(500).send('Server Error');
    }
})






module.exports = router;