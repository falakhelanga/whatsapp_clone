import User from "../models/user.js";
import { getIo } from "../utils/socket.js";
import mongoose from "mongoose";
export const addConvo = async (req, res, next) => {
  const { message, number, recipient, imageUrl } = req.body;

  try {
    const reciever = await User.findOne({ number: recipient });
    const user = await User.findOne({ number });

    if (!user) {
      const error = new Error("this number does not exist");
      res.status(404);
      throw error;
    }

    if (!reciever) {
      const error = new Error("this number does not exist");
      res.status(404);
      throw error;
    }

    user.convos.push({
      recipientName: reciever.name,
      recipeientId: recipient,
      recipientImage: reciever.imageUrl,
      messages: [
        {
          date: Date.now(),
          author: number,
          message: message,
        },
      ],
    });

    user.save();

    res.json({
      name: reciever.name,
      imageUrl: reciever.imageUrl,
      status: reciever.status,
    });
  } catch (error) {
    next(error);
  }
};

export const getConvo = async (req, res, next) => {
  const { number } = req.params;

  try {
    const user = await User.find({ number });

    if (!user) {
      const error = new Error("no user found");
      res.status(404);
      throw error;
    }
    res.status(200).json(user[0].convos);
  } catch (error) {
    next(error);
  }
};

export const addMessage = async (req, res, next) => {
  const { number, recipient, author, message } = req.body;

  try {
    const user = await User.findOne({ number });
    const reciever = await User.findOne({ number: recipient });
    const userConvo = user.convos.find(
      (convo) => convo.recipeientId === recipient
    );

    const userConvoIndex = user.convos.findIndex(
      (convo) => convo.recipeientId === recipient
    );
    const reciverConvo = reciever.convos.find(
      (convo) => convo.recipeientId === number
    );
    const reciverConvoIndex = reciever.convos.findIndex(
      (convo) => convo.recipeientId === number
    );
    const newUserMessages = [
      ...userConvo.messages,
      { date: Date.now(), author, message },
    ];

    const newRecUserMessages = [
      ...reciverConvo.messages,
      { date: Date.now(), author, message },
    ];

    user.convos[userConvoIndex].messages = newUserMessages;
    reciever.convos[reciverConvoIndex].messages = newRecUserMessages;
    await user.save();
    await reciever.save();
    res.status(201).json("message delivered");
  } catch (error) {
    next(error);
  }
};
