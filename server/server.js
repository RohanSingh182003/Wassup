const express = require("express");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");

port = 4000;

app.use(cors());

const server = app.listen(port, () => console.log(`alive on ${port}`));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  // join an user into a room
  socket.on("join_user", (id) => {
    socket.join(id);
  });
  // send message
  socket.on("send_message", (data) => {
    socket.to(data.id).emit("receive_message", data);
  });
});
