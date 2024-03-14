const express = require("express");
const app = express();

const http = require("http");
const {Server} = require("socket.io");
const server = http.createServer(app);


const io = new Server(server, {
    cors:{
        origin: "http://localhost:5173",
        credentials: true
    }
});

io.on("connection", (socket)=>{
    console.log(socket.id+" is connected to server");

    socket.on("send-msg",(data)=>{
        // socket.broadcast.emit("recieve-msg",data);/
        socket.to(data.room).emit("recieve-msg", data.msg);
    });

    socket.on("join-room", (room)=>{
        socket.join(room);
    });
});

server.listen(3001, ()=>{
    console.log("server listening to port 3001")
});
