const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

// @desc post a chat
// @route POST api/chat
// @access private

const postOneToOneChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name picture email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

// @desc to get a chat
// @route GET api/chat
// @access private

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name picture email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc to create a group chat
// @route POST api/chat/group
// @access private

const createGroupChat = asyncHandler(async (req, res) => {
  const { name, users } = req.body;

  // validating the name
  if (!name) {
    res.status(400);
    throw new Error("name is not provided");
  }

  /**
   * validations of user
   * more than two users
   * users present or not in db
   * parse the users bcz fronted UI
   */

  if (!users) {
    res.status(400);
    throw new Error("users not provided");
  }

  var usersArr = JSON.parse(users);

  if (usersArr.length < 2) {
    res.status(400);
    throw new Error("More than 2 users are required to form a group chat");
  }
  const user = req.user._id;
  usersArr.push(user);
  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: usersArr,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(201).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc update the name of ChatName or rename the group
// @route POST api/chat/group/rename
// @access private

const renameGroupChat = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

// @desc remove the user from the group
// @route POST api/chat/group/remove
// @access private

const removeUserFromGroupChat = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const removeUser = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removeUser) {
    res.status(400);
    throw new Error("Chat is not found");
  } else {
    res.json(removeUser);
  }
});

// @desc add the user to the group
// @route POST api/chat/group/add
// @access private

const addUserToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const addUser = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!addUser) {
    res.status(400);
    throw new Error("Chat is not found");
  } else {
    res.json(addUser);
  }
});

module.exports = {
  postOneToOneChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  removeUserFromGroupChat,
  addUserToGroup,
};
