const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.json({ extended: false }));

// MongoDB connection setup
mongoose.connect('mongodb+srv://john:3M58Djef5Vrhg3j@rcpinventory.8iv3rak.mongodb.net/ims',)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));



app.get('/', (req, res) => {
    res.send('API running');
})

//TODO : add middlaware for every thing route

app.use("/api/labs", require('./api/purchases/labs'));
app.use("/api/categories", require('./api/purchases/categories'));
app.use("/api/vendors", require('./api/purchases/vendors'));
app.use("/api/items", require('./api/purchases/items'));
app.use("/api/users", require('./api/purchases/users'));
app.use('/api/utility', require('./api/labUtilility/labs'));



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//create Admin and user separate routes
