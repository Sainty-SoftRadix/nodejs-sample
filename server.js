const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
io.on("connection", (socket) => {

    socket.on("chat message", (messageData) => {
        console.log("messageData :", JSON.stringify(messageData));
        socket.broadcast.emit("new_message", { ...messageData })
    })
})
server.listen(3003, () => {
    console.log("Server running at Port 3003");
})