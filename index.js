const express = require('express');
const app = express();
const path = require('path');
const server = require("http").Server(app);
let idDB = [];
let userDB = [];

const io = require("socket.io")(server);

app.use('/', express.static(path.join(__dirname, 'www')));

io.on("connection", function(socket){
    console.log("ID:", socket.id)
    socket.on("new", function(userId){
        console.log("Usuario:", userId.nombre, "con ID:", userId.id);
        idDB.push(socket.id);
        userDB.push(userId);
        socket.emit("new", {user: userId, id: socket.id});
    });
});

server.listen(3000, () => console.log('server started'));