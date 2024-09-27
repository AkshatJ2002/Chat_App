const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Allow all origins for testing; in production, specify your client URL.
        methods: ["GET", "POST"],
    }
});

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public')); // <-- Add this line

// Store users and their sockets
const users = {};

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user joining
    socket.on('join', (username) => {
        users[socket.id] = username;
        console.log(`${username} has joined`);

        // Notify all users
        io.emit('user joined', username);
    });

    // Handle chat messages
    socket.on('chat message', (message) => {
        io.emit('chat message', {
            user: users[socket.id],
            message,
        });
    });

    socket.on('disconnect', () => {
        console.log(`${users[socket.id]} has disconnected`);
        // Notify all users about the user leaving
        io.emit('user left', users[socket.id]);
        delete users[socket.id];
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
