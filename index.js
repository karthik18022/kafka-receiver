
const WebSocket = require('ws');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 8081;


const wss = new WebSocket.Server({ server:server });
const userConnections = new Map();

wss.on('connection', function connection(ws) {
    console.log('A new connection');
    ws.send(JSON.stringify({  user: 'user1234', content: 'Hello Server!' }));
    ws.on('message', function message(messsge) {
      try {
        const data = JSON.parse(messsge);
        const { user, content } = data;
        userConnections.set(user, ws);
        ws.send(JSON.stringify({  user: 'user1234', content: 'Hello Server!' }));
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            console.log('reopened connection: %s', messsge);
            console.log(user, content);
            client.send(JSON.stringify({ user, content }));
          }
        });
      } catch(err) {
        console.error('Error parsing message:', err);
      }
    });
  });

  
  var kafka = require("kafka-node"),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient(),
  consumer = new Consumer(client, [{ topic: "kani", partition: 0 }], {
    autoCommit: false,
  });  

consumer.on("message",  (message) => {
  console.log( message.value);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



