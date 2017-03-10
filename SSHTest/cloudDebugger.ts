/// <reference path="typings/index.d.ts" />
import http = require('http');
import net = require('net');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
    //console.log("Request Recieved!");
    process.stdout.write("Request Recieved!");
}).listen(80);

var server = net.createServer((stream: net.Socket) => {

    // pipe stdout to the stream:
    process.stdout.on("data", (data: Buffer) => stream.write(data));

    stream.on("data", (data: Buffer) => {
        console.log("Command Recieved: " + data.toString());
    });
    
    stream.on("end", () => {
        server.close();
    });
});

// Listen on an IPC channel
server.listen("\\\\.\\pipe\clouddebugger");