const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serve static files from the 'public' directory

// Handle connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Join a specific room
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    // Handle chat message, and emit to the specific room
    socket.on('chat message', ({ room, msg }) => {
        io.to(room).emit('chat message', msg); // Send message only to clients in that room
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
