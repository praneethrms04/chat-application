const express = require("express")
const router = express.Router()
const {verifyToken} = require("../middleware/authJwt")
const { allMessages, sendMessage } = require("../controllers/messageControllers")

router.get("/:chatId", [verifyToken], allMessages)
router.post("/", [verifyToken], sendMessage)


module.exports = router