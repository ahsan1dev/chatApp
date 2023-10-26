// server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

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
  // console.log(socket.id);
  socket.on("message", (data) => {
    console.log(data);
  });
  console.log("Connection on");
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
