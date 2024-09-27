const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const activeRooms = {}; // To keep track of active chat rooms

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/chat.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

io.on('connection', (socket) => {
  socket.on('createRoom', (roomName) => {
    if (!activeRooms[roomName]) {
      activeRooms[roomName] = [];
    }
    io.emit('roomListUpdate', Object.keys(activeRooms)); // Update all clients with the new room list
  });

  socket.on('joinRoom', ({ room, username }) => {
    socket.join(room);
    activeRooms[room].push(username);
    io.to(room).emit('message', `${username} has joined the room.`);
    io.emit('roomListUpdate', Object.keys(activeRooms)); // Update all clients with the room list
  });

  socket.on('disconnect', () => {
    // Handle user disconnect if needed
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
