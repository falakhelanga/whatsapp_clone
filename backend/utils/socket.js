import { Server } from "socket.io";

let io;

export const ioInit = (httpServer) => {
  io = new Server(httpServer);

  return io;
};

export const getIo = () => {
  if (!io) throw new Error("no socket connnected");

  return io;
};
