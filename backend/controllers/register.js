import User from "../models/user.js";
import bycript from "bcryptjs";
import tokenGenerator from "../helperfunctions/jwtGenerator.js";

export const register = async (req, res, next) => {
  const { number, name, password } = req.body;

  try {
    const userFound = await User.findOne({ number });

    if (userFound) {
      res.status(401);
      throw new Error("this number is already used");
    }

    const hashedPassword = await bycript.hash(password, 12);

    const user = await User.create({
      name,
      number,
      password: hashedPassword,
      convos: [],
    });

    res
      .json({
        name: user.name,
        number: user.number,
        token: tokenGenerator(user._id),
        imageUrl: user.imageUrl,
        convos: user.convos,
      })
      .status(201);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { number, password } = req.body;

  try {
    const userFound = await User.findOne({ number });

    if (!userFound) {
      res.status(404);
      const error = new Error(
        "this number does not exist in our database, please register to log in"
      );
      throw error;
    }

    const isPasswordMatch = await bycript.compare(password, userFound.password);
    if (!isPasswordMatch) {
      const error = new Error("you have entered an invalid password");
      res.status(401);
      throw error;
    }
    userFound.convos?.sort(
      (a, b) =>
        b.messages[b.messages.length - 1].date -
        a.messages[a.messages.length - 1].date
    );
    res.status(200).json({
      name: userFound.name,
      number: userFound.number,
      token: tokenGenerator(userFound._id),
      imageUrl: userFound.imageUrl,
      convos: userFound.convos,
    });
  } catch (error) {
    next(error);
  }
};
