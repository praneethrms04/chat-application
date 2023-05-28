const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc  user registration
//@route POST api/user/signup
//@access public

const signup = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;

  // name validation:
  if (!name) {
    res.status(400);
    throw new Error("name is not provided");
  }

  // if user is already present:

  const useravailable = await User.findOne({ email });
  if (useravailable) {
    res.status(400);
    throw new Error("email already exist");
  }

  // if user is not there

  let hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    picture,
  });

  if (user) {
    const generateToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15d" }
    );
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: generateToken,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc  user login
//@route POST api/user/login
//@access public

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //if the user is not there:
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error(`Email is not provided ${email}`);
  }

  // password validation :
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    res.status(401);
    throw new Error("Invalid password");
  }

  if (user && passwordIsValid) {
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15d" }
    );

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: accessToken,
    });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

module.exports = { signup, login };
