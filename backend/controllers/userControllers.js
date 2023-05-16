const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Get all Users
//@route GET api/users
//@access private

const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "si" } },
          { email: { $regex: req.query.search, $options: "si" } },
        ],
      }
    : {};

  const users = await User.find(keyword)
  res.send(users);
});

module.exports = { getAllUsers };
