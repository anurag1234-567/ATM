const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./mongoose');
const Customers = require('./customers');

connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('hello user');
})

//error handling 
app.post('/add/Customer', async(req, res)=>{
    try{
        const exist = await Customers.findOne({ account_no: req.body.account_no });
        if(exist){
            res.status(500).send('This Account no already exist');
            return;
        }

        const customer = new Customers({
            name: req.body.name,
            account_no: req.body.account_no,
            account_type: req.body.account_type,
            pin: req.body.pin,
            amount: req.body.amount,
            mobile_no: req.body.mobile_no,
        })

        await customer.save();
        res.send('customer saved successfully');
    }catch(err){
        res.status(500).send(err);
    }
})

app.post('/customer', async(req, res)=>{
    try{
        const customer = await Customers.findOne({ account_no: req.body.account_no, pin: req.body.pin });
        if(!customer){
            res.status(404).send('Wrong Account no or pin!!');
            return;
        }
        res.send(customer);
    }catch(err){
        res.status(500).send(err);
    }
})

app.put('/setAmount', async(req, res)=>{
    try{
      const customer = await Customers.findOneAndUpdate({ account_no: req.body.account_no }, 
        { amount: req.body.amount }, { new: true });
      res.send(customer);
    }catch(err){
        res.send(err);
    }
})

//funds transfer
app.post('/fundsTransfer', async(req, res)=>{
    try{
        const exist = await Customers.findOne({ account_no: req.body.receiver_account_no });
        if(!exist){
            res.status(404).send('Benefitary does not Exist!');
            return;
        }

        //decrement ammount from sender bank account
        await Customers.findOneAndUpdate({ account_no: req.body.sender_account_no }, 
            { $inc: { amount:  -1 * req.body.amount } } , {new: true} );

        //increment amount in receiver bank account
        await Customers.findOneAndUpdate({ account_no: req.body.receiver_account_no }, 
            { $inc: { amount:  req.body.amount } }, {new: true} );

        res.send('Funds Transfer Successfully!');
    }catch(err){
        res.status(500).send(err);
    }
})

app.put('/pinChange', async (req, res)=>{
    try{
        await Customers.findOneAndUpdate({ account_no: req.body.account_no }, { pin: req.body.pin}, { new: true });
        res.send('pin change successfully');
    }catch(err){
        res.status(500).send(err);
    }
  
})

app.listen(4000, ()=>{
    console.log('server running!');
})