import { Server } from "socket.io";

let io;

export const ioInit = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "https://chatappclone.herokuapp.com",
      methods: ["GET", "POST"],
    },
  });

  return io;
};

export const getIo = () => {
  if (!io) throw new Error("no socket connnected");

  return io;
};
