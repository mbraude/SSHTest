"use strict";
/// <reference path="typings/index.d.ts" />
var http = require("http");
var net = require("net");
var httpServer = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
    console.log("Request Recieved!");
});
var namedPipeServer = net.createServer(function (stream) {
    var originalConsoleLog = console.log;
    // When a connection starts, replace console.log with a new one that streams the output
    namedPipeServer.on("connection", function (socket) {
        console.log = function (message) {
            stream.write(message);
        };
        console.log("Cloud Debugger accepted connection from " + socket.remoteAddress);
    });
    stream.on("data", function (data) {
        console.log("Command Recieved: " + data.toString());
    });
    stream.on("end", function () {
        console.log("Client disconnected");
        console.log = originalConsoleLog;
    });
});
// Listen on port 80 for the web server:
httpServer.listen(80);
// Listen on an IPC channel
namedPipeServer.listen("\\\\.\\pipe\clouddebugger");
//# sourceMappingURL=cloudDebugger.js.map