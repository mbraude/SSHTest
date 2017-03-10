"use strict";
/// <reference path="typings/index.d.ts" />
var http = require("http");
var net = require("net");
var httpServer = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
    console.log("Request Recieved!");
});
var _socket = undefined;
var _originalConsoleLog = console.log;
var namedPipeServer = net.createServer(function (socket) {
    _socket = socket;
    _socket.on("error", function (err) {
        _originalConsoleLog("Error: " + err.name + ": " + err.message);
    });
    _socket.on("data", function (data) {
        _originalConsoleLog("Command Recieved: " + data.toString());
    });
    _socket.on("end", function () {
        _originalConsoleLog("Client disconnected");
        console.log = _originalConsoleLog;
    });
});
// When a connection starts, replace console.log with a new one that streams the output
namedPipeServer.on("connection", function (socket) {
    console.log = function (message) {
        _socket.write(message);
    };
    _originalConsoleLog("Cloud Debugger accepted connection from " + socket.remoteAddress);
});
namedPipeServer.on("error", function (err) {
    _originalConsoleLog("Server error: " + err.name + ": " + err.message);
});
// Listen on port 80 for the web server:
httpServer.listen(80);
// Listen on an IPC channel
namedPipeServer.listen(8080, "localhost");
//# sourceMappingURL=cloudDebugger.js.map