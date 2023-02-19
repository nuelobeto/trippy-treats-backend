const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  incQuantity,
  decQuantity,
  deleteCartItem,
} = require("../controllers/cartControllers");

const { requiresAuth } = require("../middlewares/authMiddleware");

router.get("/getCart/:id", requiresAuth, getCart);
router.post("/addToCart/:id", requiresAuth, addToCart);
router.put("/incQuantity/:id", requiresAuth, incQuantity);
router.put("/decQuantity/:id", requiresAuth, decQuantity);
router.delete("/deleteCartItem/:id", requiresAuth, deleteCartItem);

module.exports = router;
