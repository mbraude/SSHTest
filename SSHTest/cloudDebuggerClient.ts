import net = require('net');

var client = net.connect("\\\\.\\clouddebugger", () => {
    console.log("Connected to Cloud Debugger");
});

// Send stdin to the cloud debugger
process.stdin.on("data", (data: Buffer) => {
    client.write(data.toString());
});

// Relay all output from the pipe to our stdout:
client.on("data", (data: Buffer) => {
    console.log(data.toString());
});

client.on("end", function () {
    console.log("Cloud Debugger disconnected unexpectedly");
})

client.on("error", (err: Error) => {
    console.log("Error: " + err.name + ": " + err.message);
});
