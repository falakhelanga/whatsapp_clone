import jwt from "jsonwebtoken";

const jwtGenerator = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

export default jwtGenerator;
