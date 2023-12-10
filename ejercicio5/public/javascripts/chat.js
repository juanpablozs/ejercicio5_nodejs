const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value){
        socket.emit("chat",input.value);
        input.value = "";
    }
});

socket.on("chat", (data) => {
    const item = document.createElement("li");
    // Modificar para mostrar el nombre de usuario junto con el mensaje
    item.textContent = `${data.user}: ${data.message}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on("chat history", (history) => {
    // Mostrar el histórico de mensajes al conectar
    history.forEach((data) => {
        const item = document.createElement("li");
        item.textContent = `${data.user}: ${data.message}`;
        messages.appendChild(item);
    });
    window.scrollTo(0, document.body.scrollHeight);
});

function getUsername() {
    // Modificar para obtener el nombre de usuario desde tu aplicación de login
    // Puedes almacenar el nombre de usuario en una variable global o en una cookie de sesión
    // En este ejemplo, se asume que `loggedInUser` contiene el nombre de usuario.
    return loggedInUser ? loggedInUser.username : 'Usuario Anónimo';
}