const express = require("express");
const { postOneToOneChat } = require("../controllers/chatControllers");
const { verifyToken } = require("../middleware/authJwt");
const router = express.Router();
// @desc post a chat
// @route POST api/chat
// @access private
// One to One Chat

router.post("/", [verifyToken], postOneToOneChat);
module.exports = router;

// @desc to get a chat
// @route GET api/chat
// @access private
