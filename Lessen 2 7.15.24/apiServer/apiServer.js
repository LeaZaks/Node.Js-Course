const url = require('url')

//1. Import http module
const http = require('http') 
//Resource database
const customers = [
    { id: 1, name: 'John Doe', address: '123 Main St, Cityville', balance: 1000.00 },
    { id: 2, name: 'Jane Smith', address: '456 Elm St, Townsville', balance: 1500.50 },
    { id: 3, name: 'Michael Johnson', address: '789 Oak St, Villageton', balance: 500.25 },
    { id: 4, name: 'Emily Davis', address: '101 Pine St, Hamletville', balance: 3000.75 },
    { id: 5, name: 'David Brown', address: '222 Maple St, Suburbia', balance: 750.20 },
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

const server = http.createServer((request, response)=>{
    //API structure

    // /api/v1/customers - GET (ALL)
    // /api/v1/customers{id} - GET (ONE)
    // /api/v1/customers - POST --> {body: {name: ,address}
    // Update:
    // /api/v1/customers{id} - PUT --> {body: {name: ,address}
    // Update one field (not useful):
    // /api/v1/customers{id} - PETCH --> {body: {name: ,address}
    // /api/v1/customers{id} - DELETE


    //1. Break-down URL to components

    //2. Handle specific URI and METHOD request

    // /api/v1/customers - GET (ALL)
    3. // Response .JSON response

    const parsedUrl = url.parse(request.url, true);
    const pathname = parsedUrl.pathname;// -->/api/v1/customers
    const method = request.method; //--> GET

    if(pathname === '/api/v1/customers' && method === 'GET'){
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(customers));
    }
    else{
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('API endpoint not found!');
    }
});

const PORT = 3005

//4.Start the server
server.listen(PORT, ()=> {
    console.log(`Server is running on port http://localhost:${PORT}`)
})