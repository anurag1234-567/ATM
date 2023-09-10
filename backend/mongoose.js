const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.db_url;

const connect = async()=>{
  try{
    await mongoose.connect(url);
    console.log('database connected');
  }catch(err){
    console.log(err);
  }
}
module.exports = connect;