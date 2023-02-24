const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyEmail,
  sendResetPasswordLink,
  verifyResetPasswordLink,
  updatePassword,
} = require("../controllers/userControllers");

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:id/:token", verifyEmail);
router.post("/forgot-password", sendResetPasswordLink);
router.get("/reset-password/:id/:token", verifyResetPasswordLink);
router.put("/update-password/:id", updatePassword);

module.exports = router;
