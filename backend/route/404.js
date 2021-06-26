const pageNotFound = (req, res, next) => {
  res.status(404);
  const error = new Error("router not found");
  next(error);
};

export default pageNotFound;
