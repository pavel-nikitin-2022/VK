const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } })
let messages = []

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("here");
    socket.on("send", (text)=>{
      messages.push(text)
      socket.emit("messages", messages)
    })
    socket.on("get", ()=>{
      socket.emit("messages", messages)
    })
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});