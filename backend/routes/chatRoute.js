const express = require("express");
const {
  postOneToOneChat,
  fetchChats,
  createGroupChat,
} = require("../controllers/chatControllers");
const { verifyToken } = require("../middleware/authJwt");
const router = express.Router();

router.post("/", [verifyToken], postOneToOneChat);
router.get("/", [verifyToken], fetchChats);
router.post("/group", [verifyToken], createGroupChat);
module.exports = router;
