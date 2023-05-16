const validateUserRequest = (req, res, next) => {
  const { email, password } = req.body;

  // validate the name

  if (!email) {
    res.status(400);
    throw new Error("email is not provided");
  }

  // validate the password

  if (!password) {
    res.status(400);
    throw new Error("password is not provided");
  }
  next();
};

module.exports = validateUserRequest;
