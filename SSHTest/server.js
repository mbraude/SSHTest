"use strict";
/// <reference path="typings/index.d.ts" />
var http = require("http");
var net = require("net");
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
    console.log("Request Recieved!");
}).listen(80);
var server = net.createServer(function (stream) {
    stream.on("data", function (data) {
        console.log("Command Recieved: " + data.toString());
    });
    stream.on("end", function () {
        server.close();
    });
});
// Listen on an IPC channel
server.listen("\\\\.\\pipe\clouddebugger");
//# sourceMappingURL=server.js.map