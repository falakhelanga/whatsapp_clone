import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  number: {
    type: String,
  },
  password: {
    type: String,
  },
  imageUrl: {
    type: String,
    default: "/images/person.png",
  },

  convos: [
    {
      numMessages: {
        type: Number,
        default: 0,
      },
      status: {
        type: String,
        default: "offline",
      },
      recipientName: {
        type: String,
      },
      recipeientId: {
        type: String,
      },
      recipientImage: {
        type: String,
      },

      messages: [
        {
          date: Date,
          author: String,
          message: String,
        },
      ],
    },
  ],
});

const user = mongoose.model("User", userSchema);

export default user;
