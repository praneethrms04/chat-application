const express = require("express")
const router = express.Router()
const { getAllUsers } = require("../controllers/userControllers")
const { verifyToken } = require("../middleware/authJwt")


router.get("/",[verifyToken],getAllUsers)

module.exports = router