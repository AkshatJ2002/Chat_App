const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

app.use(cors());
app.use(bodyParser.json());

let users = {}; // Stores the socket id and username

// User connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user joining
    socket.on('join', (username) => {
        users[socket.id] = username;
        console.log(`${username} has joined`);

        // Notify all users about the new user
        io.emit('user joined', { username, users: Object.values(users) });
    });

    // Handle typing event
    socket.on('typing', (isTyping) => {
        const username = users[socket.id];
        if (username) {
            socket.broadcast.emit('typing', { username, isTyping });
        }
    });

    // Handle chat message
    socket.on('chat message', (message) => {
        const timestamp = new Date().toLocaleTimeString();
        io.emit('chat message', {
            user: users[socket.id],
            message,
            timestamp
        });
    });

    // User disconnect
    socket.on('disconnect', () => {
        const username = users[socket.id];
        if (username) {
            console.log(`${username} has disconnected`);
            io.emit('user left', { username, users: Object.values(users) });
            delete users[socket.id];
        }
    });
});

// Serve static files
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
