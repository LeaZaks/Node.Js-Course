const WebSocket = require('ws')
const http = require('http')
const path = require('path')
const fs = require('fs')


//1. Create A Http Server
const server = http.createServer((request, response) => {
      // 3.1 Parse URL and determine filename
    // 3.2 If no 'path' is defined, return 'index.html'
    
    // Ternary condition
    const url = request.url === '/' ? 'index.html' : request.url;

    const filePath = path.join(__dirname, "public", url);
    const fileExt = path.extname(filePath);
    console.log(`filePath: ${filePath}`);   

    // Set the corret response content type
    let contentType = "";

    switch (fileExt) {
        case '.html':
            case '.htm':
                contentType =  'text/html';
                break;
            case '.txt':
                contentType =  'text/plain';
                break;
            case '.css':
                contentType =  'text/css';
                break;
            case '.js':
                contentType =  'text/javascript';
                break;
            case '.json':
                contentType =  'application/json';
                break;
            case '.xml':
                contentType =  'application/xml';
                break;
            case '.png':
                contentType =  'image/png';
                break;
            case '.jpg':
            case '.jpeg':
                contentType =  'image/jpeg';
                break;
            case '.gif':
                contentType =  'image/gif';
                break;
            case '.svg':
                contentType =  'image/svg+xml';
                break;
            case '.pdf':
                contentType =  'application/pdf';
                break;
            case '.doc':
                contentType =  'application/msword';
                break;
            case '.docx':
                contentType =  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                break;
            case '.xls':
                contentType =  'application/vnd.ms-excel';
                break;
            case '.xlsx':
                contentType =  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                break;
            default:
                contentType =  'application/octet-stream'; // Default to octet-stream if extension is unknown
                break;
    }

    // 3.3 ELSE look for the desired file
    // Read file asynchronously
    fs.readFile(filePath, (error, content) => {
        // 1. Check for errors, if error exists return 404.html
        if (error != null) {
            // Check if file doesn't exist
            if (error.code === 'ENOENT') {
                const errorFile = path.join(__dirname, "public", "404.html");
                fs.readFile(errorFile, (err, data) => {
                    // Assumption, all is well
                    response.writeHead(404, {'Content-Type': contentType});
                    response.end(data, 'utf8');
                });
            } else {
                // DEFAULT error handling
                response.writeHead(500);
                response.end(`Server error: ${error.code}`);
            }
        } else {
            // 2. If all is well, return file
            response.writeHead(200, {'Content-Type': contentType});
            response.end(content, 'utf8');
        }
    });
});

//2. Initialize the WS server
const wss = new WebSocket.Server({server});

//3. Handling client connection
wss.on('connection', ws => {
    ws.on('message', msg => {
       console.log(`Recived: ${msg}`); 

       //
       wss.clients.forEach(c => {
         if(c.readyState === WebSocket.OPEN){
            
            c.send(msg);

         }
       })
    });

    console.log('Client connected');
    ws.send('Welcome the chat')
});




const PORT = 3002

//4.Start the server
server.listen(PORT, ()=> {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
