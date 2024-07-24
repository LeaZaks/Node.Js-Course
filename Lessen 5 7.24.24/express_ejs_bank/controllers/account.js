const router = require('express').Router();
const Transaction = require('../models/transaction')

router.get('/', (req, res) => {
    res.render('index', { user: user });
});

router.get('/transfer', (req, res) => {
    res.render('transfer', { user: user });
});


router.get('/newaccount', (req, res) => {
    res.render('newaccount', { user: user });
});


router.post('/newaccount',  async (req, res) => {

    const newAccount = parseFloat(req.body.account);
    const amount = parseFloat(req.body.amount);

    //Check if account already belongs to this user
    const acount = user.accounts.find(account => account.number === req.body.account);
    if(!acount){
        user.accounts.push({ number: newAccount, balance: amount })
    }
});

router.post('/transfer',  async (req, res) => {
    try{
    const fromAccount = user.accounts.find(account => account.number === req.body.fromAccount);
    const toAccount = user.accounts.find(account => account.number === req.body.toAccount);
    const amount = parseFloat(req.body.amount);
   
    if (fromAccount && toAccount && fromAccount !== toAccount && amount > 0 && fromAccount.balance >= amount) {
        fromAccount.balance -= amount;
        toAccount.balance += amount;
       
        try{
            const transaction = new Transaction({
                amount : amount,
                fromAccount : fromAccount.number,
                toAccount: toAccount.number
            });

            await transaction.save();
            console.log(`succseed!`)
            res.redirect('/');
        }
        catch(err){
            console.log(`DB Error: ${err.message}`)
            res.redirect('/');
        }
    }}
    catch(err){
        console.log(`DB Error 2: ${err.message}`)
        res.redirect('/');
    }
});

router.get('/transactions', async (req, res) => {
    
    const transactions = await Transaction.find();  
    res.render('transactions', { transactions: transactions });
});




module.exports = router;