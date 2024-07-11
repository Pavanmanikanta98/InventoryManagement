const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config')


const app = express();

app.use(bodyParser.json());
app.use(express.json({ extended: false }));

// MongoDB connection setup
mongoose.connect(config.get('database.url'))
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));



app.get('/', (req, res) => {
    res.send('API running');
})

//TODO : add middlaware for every thing route

//-----------------------------Adding(admin)------------------------------------------

app.use("/api/labs", require('./api/add/labs'));
app.use("/api/categories", require('./api/add/categories'));
app.use("/api/vendors", require('./api/add/vendors'));
app.use("/api/items", require('./api/add/items'));
app.use("/api/users", require('./api/add/users'));

//------------------------------Issues(admin and user)-----------------------------------------------

app.use("/api/toCentral",require('./api/issues/admin/toCentral'))
app.use("/api/toLab",require('./api/issues/admin/toLab'))


app.use("/api/toClass",require('./api/issues/user/toClassIssues'));
app.use("/api/toLabStock",require('./api/issues/user/toLabStock'));

//-------------------------------Lab Utility(admin and user)----------------------------------------------

app.use('/api/utility', require('./api/labUtilility/labs'));

//---------------------------------Purchases(admin and user)----------------------------------------

app.use("/api/challans", require('./api/purchases/admin/challans'));
app.use("/api/indents", require('./api/purchases/admin/indents'));
app.use("/api/quotations", require('./api/purchases/admin/quotations'));


app.use("/api/userIndents", require('./api/purchases/user/indents'));

//--------------------------------Reports(admin)---------------------------------------

app.use("/api/stockReport",require('./api/reports/stockReport'));
app.use("/api/labReport",require('./api/reports/totalToLabs'));
app.use("/api/vendorReport",require('./api/reports/vendorReport'));



const PORT = config.get('port')|| 4000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//create Admin and user separate routes
