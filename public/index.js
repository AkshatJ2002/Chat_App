const socket = io();

// Event listener for room creation
document.getElementById('createRoomForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const roomName = document.getElementById('roomName').value;
    socket.emit('createRoom', roomName);  // Send room name to server
    window.location.href = `/chat.html?room=${roomName}`; // Redirect to chat room
});

// Update room list in the sidebar
socket.on('roomListUpdate', (rooms) => {
    const roomList = document.getElementById('roomList');
    roomList.innerHTML = '';  // Clear the list before updating
    rooms.forEach(room => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="/chat.html?room=${room}">${room}</a>`;
        roomList.appendChild(li);
    });
});
