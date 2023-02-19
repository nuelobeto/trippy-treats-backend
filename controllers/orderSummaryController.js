const asyncHandler = require("express-async-handler");
const OrderSummary = require("../models/orderSummaryModel");
const Cart = require("../models/cartModel");

const getOrderSummary = asyncHandler(async (req, res) => {
  const orderSummary = await OrderSummary.find();

  res.json(orderSummary);
});

const addOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.find({ user: req.user.id });

  const orderSummaryDetails = cart.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const newOrderSummary = await OrderSummary.create({
    user: req.user.id,
    username: req.user.name,
    orderSummary: orderSummaryDetails,
  });

  res.json(newOrderSummary);
});

const clearOrder = asyncHandler(async (req, res) => {
  const updatedOrderSummary = await OrderSummary.findByIdAndUpdate(
    req.params.id,
    {
      cleared: true,
    },
    {
      new: true,
    }
  );

  res.status(200).json(updatedOrderSummary);
});

module.exports = {
  getOrderSummary,
  addOrder,
  clearOrder,
};
