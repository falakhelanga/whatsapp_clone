import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    return mongoose
      .connect(
        process.env.MONGO_URI,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        (error) => {
          !error && console.log("connected to the database");
        }
      )
      .promise();
  } catch (error) {
    console.log(error);
  }
};

export default mongoConnect;
