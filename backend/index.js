import dotenv from "dotenv";
import { Server } from "socket.io";
if (process.env.NODE_ENV !== "production")
    dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.config.js";

// @desc    Connect to DB
const DB_URI = process.env.DB_URI;
connectDB(DB_URI);

// @desc    Start Server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server has started on PORT: ${PORT} 🎉`);
});

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}


io.on("connection", (socket) => {
    socket.on('newUser', (userId) => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    socket.on("userLoggedIn", (userId) => {
        // send a notification to the admin that a user has logged in using getUser function
        const user = getUser("65e78b4bb028092b8f5b6af8")
        io.to(user?.socketId).emit('userLoggedIn', userId)
    });

    socket.on("disconnect", () => {
        removeUser(socket.id)
        io.emit("getUsers", users);
    });
});

io.listen(5000);

process.on("uncaughtException", (err, promise) => {
    console.log(`⚠️  Logged Error: \n${err}`);
    server.close(() => process.exit(1));
    console.log(`☢️  Server Closed`);
});
process.on("unhandledRejection", (err, promise) => {
    console.log(`⚠️  Logged Error: \n${err}`);
    server.close(() => process.exit(1));
    console.log(`☢️  Server Closed`);
});