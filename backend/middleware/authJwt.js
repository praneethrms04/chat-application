const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    res.status(403);
    throw new Error("No token provided");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error("User is not authorized");
    }

    try {
      const user = await User.findById(decoded.id).select("-password")
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }

      req.user = user;
      console.log(req.user)
      next();
    } catch (error) {
      res.status(500);
      throw new Error("Internal server error");
    }
  });
};

module.exports = { verifyToken };
