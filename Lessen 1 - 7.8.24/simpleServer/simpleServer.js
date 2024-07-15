//1. Import http module
const http = require('http') 

//2. Create server

const server = http.createServer((request, response)=>{
//3.Create a default response
response.end('Hello world!')
});

const PORT = 3000

//4.Start the server
server.listen(PORT, ()=> {
    console.log(`Server is running on port http://localhost:${PORT}`)
})