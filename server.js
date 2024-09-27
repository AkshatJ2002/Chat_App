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
    const roomCode = generateRoomCode(); // Generate a unique room code
    if (!activeRooms[roomCode]) {
      activeRooms[roomCode] = { name: roomName, users: [], messages: [] };
    }
    socket.join(roomCode);
    activeRooms[roomCode].users.push(username);
    io.emit('roomListUpdate', activeRooms); // Update all clients with the new room list
    socket.emit('message', `You have created the room: ${roomName} with code: ${roomCode}`);
    io.to(roomCode).emit('message', `${username} has joined the room.`);
  });

  socket.on('joinRoom', ({ roomCode, username }) => {
    if (activeRooms[roomCode]) {
      socket.join(roomCode);
      activeRooms[roomCode].users.push(username);
      io.to(roomCode).emit('message', `${username} has joined the room.`);
    } else {
      socket.emit('message', 'Room does not exist.');
    }
  });

  socket.on('disconnect', () => {
    // Handle user disconnect if needed
  });
});

// Function to generate a unique room code
function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
