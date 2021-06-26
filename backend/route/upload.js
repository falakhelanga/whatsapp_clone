import express from "express";
import multer from "multer";
import path from "path";
import uploadFile, { getFileStream } from "../aws_sdk.js";
import User from "../models/user.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
});

const checkFileTypes = (file, cb) => {
  const fileTypes = /png|jpg|jpeg/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    return cb("something went wrong");
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  },
});

router.post("/:id", upload.single("image"), async (req, res, next) => {
  const file = req.file;
  const number = req.params.id;

  const result = await uploadFile(file);
  res.send(`/images/${result.Key}`);
  const user = await User.findOne({ number });

  user.imageUrl = `/images/${result.Key}`;
  user.save();
});

export default router;
