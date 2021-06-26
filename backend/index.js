import express from "express";
import mongoConnect from "./utils/mongo.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import pageNotFound from "./route/404.js";
import error from "./route/error.js";
import userRoute from "./route/register.js";
import uploadRouter from "./route/upload.js";
import convosRouter from "./route/convos.js";
import User from "./models/user.js";
import { getFileStream } from "./aws_sdk.js";
import { ioInit } from "./utils/socket.js";

const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(__dirname, "/uploads")));
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/upload", uploadRouter);

app.use("/convos", convosRouter);
app.get("/images/:key", (req, res, next) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/front-end/build")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "front-end", "build", "index.html"));
  });
}

app.use(pageNotFound);
app.use(error);

await mongoConnect();

const port = 5000;
const server = app.listen(process.env.PORT || port, () => {
  console.log("connected");
});

const io = ioInit(server);
io.on("connect", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);
  socket.on("send-message", ({ author, message, recipient, status }) => {
    socket.broadcast.to(recipient).emit("recieve-message", {
      author,
      message,
      recipient: author,
      status: status,
    });
  });
  socket.on("I-am-disconected", ({ myRecipients, number }) => {
    myRecipients.forEach((recipient) => {
      socket.broadcast.to(recipient).emit("your-freind-is-disconected", {
        freindNumber: number,
        status: "offline",
      });
    });
  });
  socket.on("I-am-connected", ({ myRecipients, number }) => {
    myRecipients.forEach((recipient) => {
      socket.broadcast.to(recipient).emit("your-freind-is-online", {
        freindNumber: number,
        status: "online",
      });
    });
  });
  socket.on("i-am-also-online", ({ number, freindNumber }) => {
    socket.broadcast
      .to(freindNumber)
      .emit("owk-let-connect", { freindNumber: number });
  });
  socket.on("typing", ({ number, recipient }) => {
    socket.broadcast
      .to(recipient)
      .emit("your-friend-is-typing", { freindNumber: number });
  });
  socket.on("not-typing", ({ number, recipient }) => {
    socket.broadcast
      .to(recipient)
      .emit("your-friend-is-done-typing", { freindNumber: number });
  });

  console.log("socket connect to" + id);
});
