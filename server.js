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
  socket.on('createRoom', ({ roomName, username }) => {
    if (!activeRooms[roomName]) {
      activeRooms[roomName] = { users: [], messages: [] };
    }
    socket.join(roomName);
    activeRooms[roomName].users.push(username);
    io.emit('roomListUpdate', Object.keys(activeRooms)); // Update all clients with the new room list
    socket.emit('message', `You have created the room: ${roomName}`);
    io.to(roomName).emit('message', `${username} has joined the room.`);
  });

  socket.on('joinRoom', ({ room, username }) => {
    if (activeRooms[room]) {
      socket.join(room);
      activeRooms[room].users.push(username);
      io.to(room).emit('message', `${username} has joined the room.`);
    } else {
      socket.emit('message', 'Room does not exist.');
    }
  });

  socket.on('disconnect', () => {
    // Handle user disconnect if needed
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
