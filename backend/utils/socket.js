import { Server } from "socket.io";

let io;

export const ioInit = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  return io;
};

export const getIo = () => {
  if (!io) throw new Error("no socket connnected");

  return io;
};
