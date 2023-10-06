const express = require('express');
const app = express();
const cookie = require('cookie-parser');

const products = require('./routes/product');
const auth = require('./routes/auth');
app.use(express.json());
app.use(cookie());
app.use('/api/v1',products);
app.use('/api/v1', auth);
module.exports = app;