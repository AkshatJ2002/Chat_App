# 💬 TALKIT

A real-time chat application built using **Node.js**, **Socket.IO**, and **Express** that supports text messaging, file sharing (images, documents, etc.), typing indicators, and responsive message bubbles similar to WhatsApp.

## ✨ Features

- ⚡ **Real-time messaging** with users.
- 📂 **File sharing**: Upload and share images, documents, PDFs, and more.
- 💬 **Typing indicators**: See when other users are typing.
- 🟩 **Responsive message bubbles**: Messages are styled similar to WhatsApp, with self-aligning messages for you and others.
- 🖼️ **Media previews**: Images are displayed in the chat, and files are downloadable.
- 🔄 **Auto-scroll**: Chat automatically scrolls to the latest message when new content arrives.
- 📝 **Self-resizing message input box**: Input box adjusts its height based on the length of the message.
- 📱 **Mobile-friendly design**: The app is responsive and works across different screen sizes.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: HTML, CSS (with a modern, WhatsApp-like layout), JavaScript
- **Real-time communication**: Socket.IO for handling real-time events (messaging, file sharing, typing indicators)

## 🌟 Demo

Try [Talkit](https://talkit-zkph.onrender.com)

## 🚀 Features Walkthrough

### 1. 💬 **Real-Time Messaging**

Messages sent by users appear instantly, with your own messages aligned on the right and others' messages aligned on the left.

### 2. 📂 **File Sharing**

Easily share files like images and documents. Uploaded images will be previewed directly in the chat, while other files (like PDFs) will appear as downloadable links.


### 3. 🖊️ **Typing Indicator**

A typing indicator shows when another user is typing a message, adding a real-time interactive feel.

### 4. 🔄 **Auto-Scrolling**

The chat window auto-scrolls to the latest message whenever new messages are received, ensuring a seamless chat experience.

### 5. 📱 **Responsive Design**

The app's design is mobile-friendly, providing a clean and modern UI across different devices.

## 📂 Project Structure

```bash

chat-app/
│
├── public/
│   ├── index.html          # Frontend HTML
│   ├── styles.css          # CSS for styling the chat UI
│   └── script.js           # Frontend JavaScript
│
├── server.js               # Node.js server using Express and Socket.IO
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation (this file)
```

## 🔧 Customization

- **UI**: You can modify the `styles.css` file to customize the look of the chat bubbles, color schemes, and layout. You can adjust the styling to match the theme or branding of your project.
- **Backend logic**: Modify `server.js` to add additional features or customize the logic. You can implement:
  - **User authentication** to enable login and track users.
  - **Message persistence** by integrating a database like MongoDB or Firebase to store chat history.
  - **Private chat rooms** to allow one-on-one or group conversations.

## 🚧 Future Improvements

- 🔐 **Authentication**: Add user authentication to track users, ensure secure access, and personalize chats.
- 🗂️ **Persistent messages**: Integrate a database to save messages, so chat history is not lost when users disconnect.
- 🔒 **Private messaging**: Allow users to create private chat rooms for secure, one-on-one conversations or small group chats.
- 🎉 **GIF/Sticker support**: Integrate APIs such as **Giphy** or **Tenor** to allow users to send GIFs or stickers for a fun chat experience.
- 💬 **Emoji support**: Add an emoji picker to allow users to send emojis in their messages.
- 🕒 **Message timestamps**: Show more detailed timestamps for messages, like date and time.

## 📞 Contact Us

Have questions, feedback, or need help? Feel free to reach out to us!

- **Email**: [support@talkit.com](mailto:akshatjain15122002jain@gmail.com)
- **GitHub Issues**: [Create an issue](https://github.com/AkshatJ2002/chat-app/issues) to report bugs or request features.
- **Linkldin**: [Akshat Jain](https://www.linkedin.com/in/akshatjain1512/)

We'd love to hear from you and help you make the most out of this project!
