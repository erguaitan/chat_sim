const socket = io();


socket.on("new", function(userInfo){
    console.log(userInfo);
});


function enviarMensaje (msg, user, lado) {
    let lastMsg = document.querySelector(".container").querySelector("div");
    let lastUser = lastMsg.querySelector("div").querySelector("p").innerHTML;
    
    let newMsg = document.createElement("p");
    newMsg.innerHTML = msg;

    if (lastUser === user) {
        lastMsg.appendChild(newMsg)
    } else {
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
    enviarMensaje(inpMsg.value, "usuario 5", "i");
    inpMsg.value = "";
}

document.querySelector("i").addEventListener("click", inputMensaje);
document.querySelector("input").addEventListener("keydown",(e) => {
    if (e.key == "Enter") {
        inputMensaje();
    }
});



