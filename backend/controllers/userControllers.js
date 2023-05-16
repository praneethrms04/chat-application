const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Get all Users
//@route GET api/users
//@access public

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  }
});

module.exports = { getAllUsers };
