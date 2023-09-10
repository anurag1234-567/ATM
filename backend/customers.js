const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: { type: 'String', required: true },
    account_no: { type: 'String', required: true },
    account_type: { type: 'String', required: true },
    pin: { type: 'String', required: true },
    amount: { type: 'Number', required: true },
    mobile_no: { type: 'String', required: true },
    opening_date: { type: Date, default: Date.now() },
});

const Customers = new mongoose.model('Customers', schema);
module.exports = Customers;