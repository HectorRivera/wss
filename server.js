const { Console } = require("console");
const express = require("express");
const path = require("path");
const WebSocket = require("ws"); // new
const app = express();

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});
const port = 8765;
app.listen(port, () => {
	console.log(`listening http://localhost:${port}`);
});

const socketServer = new WebSocket.Server({ port: 3030 });
const messages = [];

socketServer.on("connection", (socketClient) => {
	console.log("connected");
	console.log("Number of clients: ", socketServer.clients.size);

	socketClient.send(JSON.stringify(messages));

	socketClient.on("message", (message, isBinary) => {
		//parse incomming MSG
		try {
			const msg = isBinary ? message : JSON.parse(message.toString());
			console.log("New WS Msg Received: ", msg);
			//Push msg into global Store
			messages.splice(0, 1, msg);
			console.log("Msg Sent to Subs:", messages);
			//Send to all Subscribers
			socketServer.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify([msg]));
				}
			});
		} catch (e) {
			console.log(
				"Received Junk from WSS Client, probably a non stringified JSON."
			);
		}
	});

	socketClient.on("close", (socketClient) => {
		console.log("closed");
		console.log("Number of clients: ", socketServer.clients.size);
	});
});
