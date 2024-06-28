const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.json({ extended: false }));

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));



app.get('/', (req, res) => {
    res.send('API running');
})

app.use("/api/labs", require('./api/purchases/labs'));
app.use("/api/categories", require('./api/purchases/categories'));
app.use("/api/vendors", require('./api/purchases/vendors'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//create Admin and user separate routes
