// server.js
const express = require("express");
const WebSocket = require("ws");
const SocketServer = WebSocket.Server;
const uuidv4 = require("uuid/v4");
const clients = [];
const colors = ["#0000FF", "#DC143C", "#8B4513", "#2E8B57"];
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

// Establish connection
wss.on("connection", function connection(ws) {
  console.log("client connected");

  // Counting number of users currently online
  clients.push(ws);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "connect", num: clients.length }));
    }
  });

  // Select specific username color
  let randNum = Math.floor(Math.random() * 4);
  let selectedColor = colors[randNum];

  ws.on("message", function incoming(data) {
    let object = JSON.parse(data);

    // Broadcast chat messages to clients
    if (object.type === "postMessage") {
      let sendObject = {
        type: "incomingMessage",
        id: uuidv4(),
        username: object.username,
        content: object.content,
        color: selectedColor
      };
      console.log(object)
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(sendObject));
        }
      });

      // Broadcast username change notifications to clients
    } else if (object.type === "postNotification") {
      console.log(object)
      let sendObject = {
        type: "incomingNotification",
        id: uuidv4(),
        content: object.content,
        color: selectedColor
      };
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(sendObject));
        }
      });
    }
  });

  // Close the socket and remove from currently online users
  ws.on("close", () => {
    clients.pop();
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "connect", num: clients.length }));
      }
      console.log("Client disconnected");
    });
  });
});
