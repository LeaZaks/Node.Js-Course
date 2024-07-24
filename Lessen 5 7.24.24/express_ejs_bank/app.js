//import
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const resLogger = require('./middlewares/response_logger');
const authMiddleWare = require('./middlewares/auth');


//DB & CONFIG import
const mongoose = require('mongoose')

const dotenv = require('dotenv');

const accountController = require('./controllers/account');
const authController = require('./controllers/auth');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(resLogger);

dotenv.config();

const user = {
    name: 'John Doe',
    accounts: [
        { number: '12345678', balance: 5000 },
        { number: '87654321', balance: 3000 }
    ]
};

//using mongo
//ceate connection string
const connectionString = process.env.MONGODB_URI;
//connect to mongoDB
mongoose.connect(connectionString/*, { useNewUrlParser: true }*/ )
    .then(()=>{
        console.log('mongodb connected succsesful') ;       
    })
    .catch(err=>
        {
        console.log(`mongodb Failed to connect Error: ${err.message}`)        
    });

//const transactions = [];

app.use('/accounts', authMiddleWare, accountController)
app.use('/auth', authController);

app.listen(port, () => {
    console.log(`Banking app listening at http://localhost:${port}`);
});