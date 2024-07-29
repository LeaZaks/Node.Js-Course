// -- MODEL CLASS --
// 1. Import 'mongoose'
const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    balance: {type: Number, required: true }
});

// 2. Define schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: {type: String, required: true },
    name: { type: String, required: true },
    accounts: [AccountSchema]
});

// 3. Export model / schema
//const User = mongoose.model('User', UserSchema);
//const Account  = mongoose.model('Account', AccountSchema);


module.exports = mongoose.model('User', UserSchema);//User;
//module.exports = mongoose.model('Account', AccountSchema);//User;


