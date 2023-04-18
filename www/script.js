const socket = io();

let currentUser = "usuario1"
let currentId = "z";

document.getElementById("modal_user").style.display = "flex";
document.getElementById("modal_user").showModal();

socket.on("new", function(userInfo) {;
    currentId = userInfo
    document.getElementById("modal_user").style.display = "none";
    document.getElementById("modal_user").close();
});



socket.on("msg", function(msg){
    enviarMensaje(msg.content, msg.user)
});


function enviarMensaje (msg, user){
    if (document.querySelector(".container").children.length === 0){
        enviarMensajeFirst(msg,user);
    }else{
        enviarMensajeNotFirst(msg,user);
    }
}

function enviarMensajeNotFirst (msg, user) {
    let lastMsg = document.querySelector(".container").querySelector("div");
    let lastUser = lastMsg.querySelector("div").querySelector("p").innerHTML;
    
    let newMsg = document.createElement("p");
    newMsg.innerHTML = msg;

    if (lastUser === user) {
        lastMsg.appendChild(newMsg)
    } else {
        let lado
        if (user === currentUser){
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

function enviarMensajeFirst (msg, user) {
    let newMsg = document.createElement("p");
    newMsg.innerHTML = msg;

    let lado
        if (user === currentUser){
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
        cont.appendChild(contMsg);

}

function inputMensaje () {
    let inpMsg = document.getElementById("sender");
    if (inpMsg.value !== ""){
        enviarMensaje(inpMsg.value, currentUser);
        socket.emit("msg", {content:inpMsg.value, user:currentUser});
        inpMsg.value = "";
    }
}

document.querySelector("i").addEventListener("click", inputMensaje);
document.getElementById("sender").addEventListener("keydown",(e) => {
    if (e.key == "Enter") {
        inputMensaje();
    }
});


document.querySelector("dialog").querySelector("button").addEventListener("click", () => {
    currentUser = document.getElementById("inp_user").value
    socket.emit("new", currentUser);
});



