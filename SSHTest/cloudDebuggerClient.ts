import net = require('net');

var client = net.connect(8080, "localhost", () => {
    console.log("Connected to Cloud Debugger");
});

// Relay all output from the pipe to our stdout:
client.on("data", (data: Buffer) => {
    console.log(data.toString());
});

client.on('end', function () {
    console.log("Cloud Debugger disconnected unexpectedly");
})

client.on("error", (err: Error) => {
    console.log("Error: " + err.name + ": " + err.message);
});