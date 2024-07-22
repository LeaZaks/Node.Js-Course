

const express = require('express');
const fs = require('fs');
const path = require('path');

//Import all router handlers
const customerRoutes = require('./customerRoutes');

let logcounter=1;
const app =  express();
const port = 3000;

//PRE HANDLER
app.use(express.json());

//custom middleware- Logging
app.use((req, res, next)=>{
    console.log(`${logcounter++} | Method: ${req.method}`);
    next();
});

//custom middleware- Log responses
app.use((req , res, next)=>{
    var originalSend = res.send;

 /*   res.send = (body)=>{
        console.log(body);
        originalSend(body);
    }
    next();
*/
    res.on('finish', ()=>{
        console.log(res.statusCode);
    });
    next();
    /*

  // Create a buffer to store the response chunks
  var chunks = [];

  // Override the res.end function to capture data
  res.end = function(chunk, encoding) {
    if (chunk) {
      chunks.push(Buffer.from(chunk, encoding));
    }

    // Concatenate all chunks to get the full response body
    var body = Buffer.concat(chunks).toString('utf8');

    // Log the request method, URL, status code, and response body
    const logEntry = `${new Date().toISOString()} | ${req.method} ${req.url} ${res.statusCode}\n${body}\n\n`;
    const logFilePath = path.join(__dirname, 'response.log');

    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });

    // Call the original res.end function to send the response to the client
    res.end = originalEnd;
    res.end(chunk, encoding); 
    };

    // Call the next middleware in the chain
    next();*/
});


app.use('/api/customers', customerRoutes);

app.get('/', (req, res)=>{
    res.send('hello world');
});

app.get('/api', (req, res)=>{
    res.send({ message: 'hello world'});
});

//Example: /api/search?q=hello
app.get('/api/search', (req, res, next)=>{
    const { q } = req.query;
    //Perform search

    const error = new Error('critical server eror');
    error.status = 401;
    if(error){
        next(error)
    }
    else{
        res.send({'search': q})
    }

});

//custom middleware- Logging



//custom middleware- Logging
app.use((err ,req , res, next)=>{
    console.log(`Error: ${err.status} - ${err.message}`);
    res.status(err.status||500).json({error:err.message});
});


app.listen(port ,() => {
    console.log(`http://localhost:${port}`)
});
