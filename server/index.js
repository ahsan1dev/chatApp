const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
// here is some thing
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 4000;

const allowedOrigins = ["http://localhost:3000", "http://172.29.123.24:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("recive", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
