const express = require('express');
const Vendor = require('../../models/vendor');
const Indent = require('../../models/indent');
const Quotation = require('../../models/quotation');
// const indent = require('../../models/indent');

const router = express.Router();

//@route post api/vendors
//desc  create a vendor
router.post("/", async (req, res) => {
    const { vendorName, vendorAddress, vendorMobile } = req.body;

    try {

        if (vendorAddress == null || vendorMobile === null || vendorName == null) {
            return res.status(403).json({ message: "insuffieceint data" });
        }

        const vendor = new Vendor({
            vendorName: vendorName,
            vendorAddress: vendorAddress,
            vendorMobile: vendorMobile
        })

        await vendor.save();

        return res.status(201).json({ message: "new vendor added" })


    } catch (er) {

        console.log(er);
        return res.status(500).json({ message: "server side error" })

    }

})
//@route labs api/labs/
//desc  get labs
router.get('/', async (req, res) => {
    try {
        const vendors = await Vendor.find().sort({ date: -1 });
        return res.json(vendors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

//@route for search vendor by id

router.get('/', async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) return res.status(403).json({ message: "insufficient data" });

        const vendor = Vendor.findById(id);
        if (vendor === null) return res.status(403).json({ message: " vendor not found" });
        //    await Vendor.findByIdAndDelete(id);

        return res.status(200).json(vendor);

    } catch (er) {

        console.log(er.message);
        return res.status(500).json({ message: "server side error" })

    }
})


//delete vendor
router.delete('/', async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) return res.status(403).json({ message: "insufficient data" });

        const vendor = Vendor.findById(id);
        if (vendor === null) return res.status(403).json({ message: " vendor not found" });
        await Vendor.findByIdAndDelete(id);

        return res.status(200).json({ message: "vendor deleted" });

    } catch (er) {

        console.log(er.message);
        return res.status(500).json({ message: "server side error" })

    }
})

//create quotation and link with the indent

router.post('/quotation', async (req, res) => {
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
router.delete('/quotation', async (req, res) => {
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
router.get("/quotation",async(req,res)=>{
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

router.get("/quotation", async(req,res)=>{
    try {
        const quotations = await Quotation.find().sort({ date: -1 });
        return res.json(quotations);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})







//@route for send indent
router.post('/indent', async (req, res) => {
    const { itemName,
        itemDescription,
        quantity
    } = req.body;


    try {

        if (itemName === null ||
            itemDescription === null ||
            quantity === null) {
            return res.status(404).json({ message: "insufficeinet data" });

        }

        const indent = new Indent({
            itemName: itemName,
            itemDescription: itemDescription,
            quantity: quantity
        });

        await indent.save();

        return res.status(201).json({ message: "new indent created" });




    } catch (er) {
        console.log(er.message);
        return res.status(500).json({ message: "server error" });
    }
})


//@route for delete indent

router.delete('/indent', async (req, res) => {
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
router.get("/indent",async(req,res)=>{
    const {id}= req.body;
    try{
        if(id===null){
            return res.status(403).json({message:"insuff data"})
        }
        const indent = await Indent.findById(id)
        if(!indent){
            return res.status(404).json({message:'indent not found'});
        }
    }
    catch(err){
        console.log(er.message);
        return res.status(500).json({ message: "server side error" })

    }
})

//@route to get all indents
router.get("/indent", async(req,res)=>{
    try {
        const indents = await Indent.find().sort({ date: -1 });
        return res.json(indents);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



<<<<<<< HEAD
module.exports = router;
=======


>>>>>>> cf4ffccbb87cd88223887a6562ed02b968a81a4a
