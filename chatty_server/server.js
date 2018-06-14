// server.js

const express = require("express");
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');
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


wss.on('connection', function connection(ws) {
  console.log('client connected');
  let randNum = Math.floor(Math.random()*4);
  let selectedColor = colors[randNum];
  clients.push(ws);
  wss.clients.forEach(function each(client){
    if (client.readyState === WebSocket.OPEN){
      client.send(JSON.stringify({type: 'connect', num: clients.length}));
    }
  })

  ws.on('message', function incoming(data) {
    let object = JSON.parse(data)
    
   if(object.type === 'postMessage'){
    let sendObject = {
      type: "incomingMessage",
            id: uuidv4(),
      username: object.username,
      content: object.content,
      color: selectedColor
    }
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(sendObject));
      }
    });
  }
   else if (object.type === 'postNotification'){
    let sendObject = {
      type: "incomingNotification",
      id: uuidv4(),
      content: object.content,
      color: selectedColor
    }
    wss.clients.forEach(function each(client){
      if (client.readyState === WebSocket.OPEN){
        client.send(JSON.stringify(sendObject));
      }
    })
  }
  });
  
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    clients.pop();
    wss.clients.forEach(function each(client){
      if (client.readyState === WebSocket.OPEN){
        client.send(JSON.stringify({type:'connect', num: clients.length}));
      }
      console.log("Client disconnected")
    })

  });
});
