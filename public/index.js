const socket = io();

// Event listener for room creation
document.getElementById('createRoomForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const roomName = document.getElementById('roomName').value;
    const username = document.getElementById('username').value;
    socket.emit('createRoom', { roomName, username });  // Send room name and username to server
    window.location.href = `/chat.html?room=${roomName}&username=${username}`; // Redirect to chat room
});

// Event listener for joining a room
document.getElementById('joinRoomForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const roomName = document.getElementById('joinRoomName').value;
    const username = document.getElementById('joinUsername').value;
    socket.emit('joinRoom', { room: roomName, username }); // Send join request to server
    window.location.href = `/chat.html?room=${roomName}&username=${username}`; // Redirect to chat room
});

// Update room list in the sidebar
socket.on('roomListUpdate', (rooms) => {
    const roomList = document.getElementById('roomList');
    roomList.innerHTML = '';  // Clear the list before updating
    rooms.forEach(room => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="/chat.html?room=${room}&username=${document.getElementById('username').value}">${room}</a>`;
        roomList.appendChild(li);
    });
});
