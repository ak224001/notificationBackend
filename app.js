var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const generateData = () =>{
  return [{
    id:Math.floor((Math.random() * 100000) + 1),
    message:`message  ${Math.floor((Math.random() * 100) + 1)}`,
    time:`${Math.floor((Math.random() * 10) + 1)} week`,
    read:false
  }]
}

//Integrating Socket.IO
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 3000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  // Emitting a new message. Will be consumed by the client
  socket.emit("data", generateData());
};

const server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
// var server_host = process.env.YOUR_HOST || '0.0.0.0';


http.listen(server_port, () => {
  console.log(`listening on *:${server_port}`);
});