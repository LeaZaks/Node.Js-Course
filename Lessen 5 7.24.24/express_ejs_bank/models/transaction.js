//--MODEL CLASS
//Import 'mongoos'
const mongoose = require('mongoose') 

//Define schema
const TransactionSchema = new mongoose.Schema({

    date: { type: Date, default: Date.now },
    amount: {type: Number, required: true},
    fromAccount: {        
        type: mongoose.Schema.Types.ObjectId,
        ref:'User.accounts', 
        required: true},
    toAccount: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:'User.accounts', 
        required: true},
    notes: {type: String}

});


//Export model / schema
module.exports = mongoose.model('Transaction', TransactionSchema)