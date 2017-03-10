"use strict";
var net = require("net");
var client = net.connect("\\\\.\\pipe\clouddebugger", function () {
    console.log("Connected to Cloud Debugger");
});
// Relay all output from the pipe to our stdout:
client.on("data", function (data) {
    console.log(data.toString());
});
client.on('end', function () {
    console.log("Cloud Debugger disconnected unexpectedly");
});
//# sourceMappingURL=cloudDebuggerClient.js.map