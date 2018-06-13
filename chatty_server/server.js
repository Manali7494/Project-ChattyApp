// server.js

const express = require("express");
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });


wss.on('connection', function connection(ws) {
  console.log('client connected');
  ws.on('message', function incoming(data) {
    let messageObject = JSON.parse(data)
    let sendObject = {
            id: uuidv4(),
      username: messageObject.username,
      content: messageObject.content
    }
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(sendObject));
      }
    });
  });  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => console.log("Client disconnected"));
});
