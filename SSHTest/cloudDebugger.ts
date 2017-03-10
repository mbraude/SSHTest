/// <reference path="typings/index.d.ts" />
import http = require('http');
import net = require('net');

var httpServer = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
    console.log("Request Recieved!");
});

var namedPipeServer = net.createServer((stream: net.Socket) => {

    var originalConsoleLog = console.log;
    
    // When a connection starts, replace console.log with a new one that streams the output
    namedPipeServer.on("connection", (socket: net.Socket) => {
        console.log = (message: string) => {
            stream.write(message);
        }

        originalConsoleLog("Cloud Debugger accepted connection from " + socket.remoteAddress);
    });

    stream.on("error", (err: Error) => {
        originalConsoleLog("Error: " + err.name + ": " + err.message);
    });
    
    stream.on("data", (data: Buffer) => {
        originalConsoleLog("Command Recieved: " + data.toString());
    });
    
    stream.on("end", () => {
        originalConsoleLog("Client disconnected");
        console.log = originalConsoleLog;

    });
});

// Listen on port 80 for the web server:
httpServer.listen(80);

// Listen on an IPC channel
namedPipeServer.listen(8080, "localhost");