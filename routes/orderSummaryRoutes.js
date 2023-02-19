const express = require("express");
const router = express.Router();

const {
  getOrderSummary,
  addOrder,
  clearOrder,
} = require("../controllers/orderSummaryController");
const {
  requiresAdminAuth,
  requiresAuth,
} = require("../middlewares/authMiddleware");

router.get("/getOrderSummary", requiresAdminAuth, getOrderSummary);
router.post("/addOrder", requiresAuth, addOrder);
router.put("/clearOrder/:id", requiresAdminAuth, clearOrder);

module.exports = router;
