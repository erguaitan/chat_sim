const socket = io();

let currentUser = "usuario1"
let currentID = "z"

socket.emit("new", currentUser);

socket.on("new", function(userInfo) {
    currentID = userInfo.id;
});

socket.on("msg", function(msg){
    enviarMensaje(msg.content, msg.user, msg.id)
});


function enviarMensaje (msg, user, userId) {
    let lastMsg = document.querySelector(".container").querySelector("div");
    let lastUser = lastMsg.querySelector("div").querySelector("p").innerHTML;
    
    let newMsg = document.createElement("p");
    newMsg.innerHTML = msg;

    if (lastUser === user && userId === currentID) {
        lastMsg.appendChild(newMsg)
    } else {
        let lado
        if (userId === currentID){
            lado = "d";
        }else {
            lado = "i"
        }
        //imagen user
        let imgUser = document.createElement("img");
        imgUser.src = "media/user.jpg";
        imgUser.alt = "user";
        // nombre user
        let nameUser = document.createElement("p");
        nameUser.innerHTML = user;
        // container info user
        let infoMsg = document.createElement("div");
        infoMsg.appendChild(imgUser);
        infoMsg.appendChild(nameUser);
        // mensaje
        let contMsg = document.createElement("div");
        contMsg.className = "mensaje_" + lado;
        contMsg.appendChild(infoMsg);
        contMsg.appendChild(newMsg);
        // container
        let cont = document.querySelector(".container");
        cont.insertBefore(contMsg, lastMsg);
    }
}

function inputMensaje () {
    let inpMsg = document.querySelector("input");
    enviarMensaje(inpMsg.value, currentUser, currentID);
    socket.emit("msg", {content:inpMsg.value, user:currentUser, id:currentID});
    inpMsg.value = "";
}

document.querySelector("i").addEventListener("click", inputMensaje);
document.querySelector("input").addEventListener("keydown",(e) => {
    if (e.key == "Enter") {
        inputMensaje();
    }
});



