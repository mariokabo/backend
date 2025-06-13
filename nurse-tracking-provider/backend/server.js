const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: "*" }
});

let providersOnline = [];
let requests = [];

io.on('connection', (socket) => {
  socket.on('providerOnline', (providerData) => {
    providersOnline.push({ id: socket.id, ...providerData });
  });

  socket.on('disconnect', () => {
    providersOnline = providersOnline.filter(p => p.id !== socket.id);
  });

  socket.on('newRequest', (requestData) => {
    requests.push(requestData);
    providersOnline.forEach(provider => {
      io.to(provider.id).emit('requestNotification', requestData);
    });
  });
});

app.post('/api/request', (req, res) => {
  requests.push(req.body);
  providersOnline.forEach(provider => {
    io.to(provider.id).emit('requestNotification', req.body);
  });
  res.json({ ok: true });
});

server.listen(4000, () => {
  console.log("Server running on 4000");
});