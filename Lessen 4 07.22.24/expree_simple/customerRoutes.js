let customers = [
    { id: 1, name: 'John Doe', address: '123 Main St, Cityville', balance: 1000.00 },
    { id: 2, name: 'Jane Smith', address: '456 Elm St, Townsville', balance: 1500.50 },
    { id: 3, name: 'Michael Johnson', address: '789 Oak St, Villageton', balance: 500.25 },
    { id: 4, name: 'Emily Davis', address: '101 Pine St, Hamletville', balance: 3000.75 },
    { id: 5, name: 'David Brown', address: '222 Maple St, Suburbia', balance: 750.20 },
    {id: 6, name: 'Sarah Wilson', address: '333 Cedar St, Countryside', balance: 1200.00 },
    { id: 7, name: 'Robert Taylor', address: '444 Birch St, Townville', balance: 800.60 },
    { id: 8, name: 'Jennifer Martinez', address: '555 Oak St, Cityville', balance: 2200.30 },
    { id: 9, name: 'William Garcia', address: '666 Pine St, Hamletville', balance: 1750.10 },
    { id: 10, name: 'Mary Hernandez', address: '777 Elm St, Countryside', balance: 900.45 },
    { id: 11, name: 'James Lopez', address: '888 Cedar St, Villageton', balance: 600.90 },
    { id: 12, name: 'Patricia Gonzalez', address: '999 Maple St, Suburbia', balance: 300.00 },
    { id: 13, name: 'Richard Rodriguez', address: '111 Birch St, Townville', balance: 1800.75 },
    { id: 14, name: 'Linda Moore', address: '222 Oak St, Cityville', balance: 950.50 },
    { id: 15, name: 'Charles Young', address: '333 Main St, Hamletville', balance: 2000.25 },
    {id: 16, name: 'Amanda Lee', address: '444 Elm St, Countryside', balance: 1300.80 },
    { id: 17, name: 'Joseph Walker', address: '555 Cedar St, Villageton', balance: 1100.35 },
    { id: 18, name: 'Barbara Perez', address: '666 Maple St, Suburbia', balance: 400.15 },
    { id: 19, name: 'Thomas Hall', address: '777 Birch St, Townville', balance: 1600.60 },
    { id: 20, name: 'Jessica Scott', address: '888 Oak St, Cityville', balance: 700.70 }]

const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    console.log('get all customers');
    res.status(200).json({customers: customers});
});
router.post('/', (req, res)=>{
    
    const newCustomer = req.body; // Assuming incoming data is JSON
    newCustomer.Id = customers.length + 1;    
    customers.push(newCustomer); // Store the new item (you might want to add ID or other properties)
    res.status(201).json(newCustomer);
});


router.get('/:id', (req, res)=>{
    const id = req.params.id;
    console.log('id: ', id);
    res.send({ id: `${id}`});
});

router.delete('/:id',  (req, res) =>{
    try {
        const index = customers.findIndex(customer => customer.id == req.params.id);

        if (index !== -1) {
            // Remove customer from array
            customers.splice(index, 1);
            res.status(201).json({ message: 'Customer deleted successfully' });

        } else {
            res.status(404).json({ message: 'Customer not found' });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id',  (req, res) =>{
    console.log('put');
    const index = customers.findIndex(customer => customer.id == req.params.id);
        
    if (index !== -1) {
        let body = '';
        
        try {
            const updatedCustomer = req.body; // Assuming incoming data is JSON
            
            customers[index].name  = updatedCustomer.name;
            customers[index].address  = updatedCustomer.address;
            customers[index].balance  = updatedCustomer.balance;

            res.status(200).json(customers[index]);
        }
         catch (error) {
            res.status(400).json({ message: 'Invalid JSON' });
        }    
    } else 
    {
        es.status(404).json({ message: 'Customer not found' });
    }
});


router.get('/:id/transaction/:tranId', (req, res)=>{
   const { id, tranId} = req.params;
   
    console.log('id: ', id);
    res.send({ id: `${id}` , tran_id : `${tranId}`});
});


module.exports = router;