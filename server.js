const http = require('http');
const app = require('./app')
const port = process.env.PORT || 6969

const server = http.createServer(app);

server.listen(port,()=>{
    console.log("Server successfully started on port: 6969.")
});