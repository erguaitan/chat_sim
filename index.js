const express = require('express');
const app = express();
const path = require('path');
const server = require("http").Server(app);

let userDB = [];

const io = require("socket.io")(server);

app.use('/', express.static(path.join(__dirname, 'www')));

io.on("connection", function(socket){
    socket.on("new", function(userName){
        if (userDB.indexOf(userName) === -1){
            console.log("Usuario:", userName, "con ID:", socket.id);
            userDB.push(userName);
            socket.emit("new", socket.id);
        }  
    });

    socket.on("msg", function(msg){
        socket.broadcast.emit("msg", msg);
    });
});

server.listen(3000, () => console.log('server started'));