const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../middlewares/email");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const existingUser = await User.findOne({
    email: new RegExp("^" + email + "$", "i"),
  });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = await Token.create({
    user: user.id,
    token: crypto.randomBytes(32).toString("hex"),
  });

  const message = `
  <h3>Welcome to Trippy-treats.</h3>
  <p>Please click the link below to verify your email.</p>
  <a href="${process.env.BASE_URL}/verify/${user.id}/${token.token}?redirect=${process.env.FRONTEND_URL}/verify/${user.id}/${token.token}">verify email</a>
  `;

  await sendEmail(user.email, "verify email", message);

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    verified: user.verified,
    token: generateToken(user.id),
    message: "An email has been sent to your account",
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: new RegExp("^" + email + "$", "i"),
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    verified: user.verified,
    token: generateToken(user.id),
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid link");
  }

  const token = await Token.findOne({
    user: user.id,
    token: req.params.token,
  });

  if (!token) {
    res.status(400);
    throw new Error("Invalid link");
  }

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      verified: true,
    },
    {
      new: true,
    }
  );

  const redirectUrl = req.query.redirect;
  res.redirect(redirectUrl);

  res.status(200).json({
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    verified: updatedUser.verified,
    token: generateToken(updatedUser.id),
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  register,
  login,
  verifyEmail,
};
