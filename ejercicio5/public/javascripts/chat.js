const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");



socket.on("chat history", (history) => {
  history.forEach((data) => {
    const item = document.createElement("li");
    item.textContent = `${data.user}: ${data.message}`;
    messages.appendChild(item);
  });
  window.scrollTo(0, document.body.scrollHeight);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    const messageData = {
      user: getUsername(),
      message: input.value
    };
    socket.emit("chat", messageData);

    const item = document.createElement("li");
    item.textContent = `${messageData.user}: ${messageData.message}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

    socket.emit("save to database", messageData);

    input.value = "";
  }
});

socket.on("chat", (data) => {
  const item = document.createElement("li");
  item.textContent = `${data.user}: ${data.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

function getUsername() {
  return loggedInUser ? loggedInUser.username : 'Usuario Anónimo';
}
