const socket = io();

// Event listener for room creation
document.getElementById('createRoomForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const roomName = document.getElementById('roomName').value;
    const username = document.getElementById('username').value;
    socket.emit('createRoom', { roomName, username });  // Send room name and username to server
});

// Event listener for joining a room
document.getElementById('joinRoomForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const roomCode = document.getElementById('joinRoomCode').value;
    const username = document.getElementById('joinUsername').value;
    socket.emit('joinRoom', { roomCode, username }); // Send join request to server
    window.location.href = `/chat.html?room=${roomCode}&username=${username}`; // Redirect to chat room
});

// Update room list in the sidebar
socket.on('roomListUpdate', (rooms) => {
    const roomList = document.getElementById('roomList');
    roomList.innerHTML = '';  // Clear the list before updating
    for (const [code, room] of Object.entries(rooms)) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="/chat.html?room=${code}&username=${document.getElementById('username').value}">${room.name} (Code: ${code})</a>`;
        roomList.appendChild(li);
    }
});
