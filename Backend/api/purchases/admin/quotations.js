const express = require('express');


const Quotation = require('../../../models/quotation');

const router = express.Router();


//create quotation and link with the indent

router.post('/', async (req, res) => {
    const {
        itemName, itemDescription, quantity, price, indentId
    } = req.body;


    try {
        if(itemName === null ||
            itemDescription === null ||
            quantity === null || price===null|| indentId===null)
            {
                return res.status(404).json({message:"insuff data"});
            }
            const quotation = new Quotation ({
                itemName,
                itemDescription,
                quantity,
                price,
                indent: indentId
            })
            await quotation.save();
            return res.status(201).json({message:"quotaion created"})
        } 
            catch (error) 
            {
            console.log(er.message);
            return res.status(500).json({ message: "server error" });
    
           }
})

//@route for delete quotation
router.delete('/', async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) return res.status(403).json({ message: "insufficient data" });

        const quotaion = Quotation.findById(id);
        if (quotaion === null) return res.status(403).json({ message: " quotation not found" });
        await Quotation.findByIdAndDelete(id);

        return res.status(200).json({ message: "quotation deleted" });

    } catch (er) {

        console.log(er.message);
        return res.status(500).json({ message: "server side error" })

    }
})

//@route to get selected quotation
router.get("/",async(req,res)=>{
    const {id}= req.body;

    try{
        if(id===null){
            return res.status(403).json({message:"insuff data"})
        }
        const quotaion = await Quotation.findById(id)
        if(!quotaion){
            return res.status(404).json({message:'quotation not found'});
        }
    }
    catch(err){
        console.log(er.message);
        return res.status(500).json({ message: "server side error" })

    }
})

//@route for all quotations

router.get("/", async(req,res)=>{
    try {
        const quotations = await Quotation.find().sort({ date: -1 });
        return res.json(quotations);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})




module.exports = router;
