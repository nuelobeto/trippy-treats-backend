const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyEmail,
} = require("../controllers/userControllers");

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:id/:token", verifyEmail);

module.exports = router;
