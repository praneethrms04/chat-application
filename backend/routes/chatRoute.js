const express = require("express");
const {
  postOneToOneChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
} = require("../controllers/chatControllers");
const { verifyToken } = require("../middleware/authJwt");
const router = express.Router();

router.post("/", [verifyToken], postOneToOneChat);
router.get("/", [verifyToken], fetchChats);
router.post("/group", [verifyToken], createGroupChat);
router.put("/group/rename", [verifyToken], renameGroupChat)
module.exports = router;
