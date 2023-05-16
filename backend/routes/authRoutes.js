const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/authControllers");
const validateUserRequest = require("../middleware/userRequest");

router.post("/login", [validateUserRequest], login);
router.post("/signup", [validateUserRequest], signup);

module.exports = router;
