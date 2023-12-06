
const  WebSocket = require('ws');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 8081;


const wss = new WebSocket.Server({ server:server });

wss.on('connection', function connection(ws) {
    console.log('A new connection');
    ws.send('something');
    ws.on('message', function message(data) {
      console.log('received: %s', data);
      ws.send('Got message: %s', data);
    });
  });

  var kafka = require("kafka-node"),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient(),
  consumer = new Consumer(client, [{ topic: "kani", partition: 0 }], {
    autoCommit: false,
  });  

consumer.on("message", function (message) {
  console.log( message.value);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



