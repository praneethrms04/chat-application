const express = require("express");
const {
  postOneToOneChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  removeUserFromGroupChat,
  addUserToGroup,
} = require("../controllers/chatControllers");
const { verifyToken } = require("../middleware/authJwt");
const router = express.Router();

router.post("/", [verifyToken], postOneToOneChat);
router.get("/", [verifyToken], fetchChats);
router.post("/group", [verifyToken], createGroupChat);
router.put("/group/rename", [verifyToken], renameGroupChat);
router.put("/group/remove", [verifyToken], removeUserFromGroupChat);
router.put("/group/add", [verifyToken], addUserToGroup);
module.exports = router;
