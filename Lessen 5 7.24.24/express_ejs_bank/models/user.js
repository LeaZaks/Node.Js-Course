//--MODEL CLASS
//Import 'mongoos'
const mongoose = require('mongoose') 

//Define schema
const AccountSchema = new mongoose.Schema({
    number : { type:Number,  required: true },
    balance:{ type:Number,  required: true },   
 });

const UserSchema = new mongoose.Schema({

   username : { type:String,  required: true },
   password:{ type:String,  required: true },
   name:{ type:String,  required: true },
   account: [AccountSchema]
});


//Export model / schema
module.exports = mongoose.model('Transaction', TransactionSchema)