import * as express from "express";
import { Server as SocketIOServer } from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`The socket ${socket.id} has connected`);

  socket.on("disconnect", () => {
    console.log(`The socket ${socket.id} has disconnected`);
  });

  socket.on("comment", (comment) => {
    console.log(`
      The socket ${socket.id} has sent a comment:
      ${comment}
    `);

    const randomId = Math.floor(Math.random() * 10000);
    const notification = {
      id: randomId,
      message: `${socket.id} has commented on your post`,
    };

    socket.emit("notification", notification);
  });
});

httpServer.listen(8000, () => {
  console.log("Server is running on port 8000");
});
