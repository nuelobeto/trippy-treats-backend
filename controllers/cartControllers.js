const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");

const getCart = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id) {
    res.status(401);
    throw new Error("Unauthorized!");
  }

  const cart = await Cart.find({ user: req.user.id });
  res.status(200).json(
    cart.map((cartItem) => {
      return {
        id: cartItem.id,
        name: cartItem.name,
        description: cartItem.description,
        category: cartItem.category,
        image: cartItem.image,
        price: cartItem.price,
        quantity: cartItem.quantity,
      };
    })
  );
});

const addToCart = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { id, name, description, category, image, price } = product;
  const existingProduct = await Cart.findOne({
    user: req.user.id,
    productId: id,
  });
  if (existingProduct) {
    res.status(400);
    throw new Error("product already in your cart");
  }
  const newCartItem = await Cart.create({
    name,
    description,
    category,
    image,
    price,
    user: req.user.id,
    productId: id,
  });
  res.status(201).json({
    id: newCartItem.id,
    name: newCartItem.name,
    description: newCartItem.description,
    category: newCartItem.category,
    image: newCartItem.image,
    price: newCartItem.price,
    quantity: newCartItem.quantity,
  });
});

const incQuantity = asyncHandler(async (req, res) => {
  const cartItem = await Cart.findOne({
    user: req.user.id,
    _id: req.params.id,
  });

  const updatedCartItem = await Cart.findOneAndUpdate(
    {
      user: req.user.id,
      _id: req.params.id,
    },
    {
      quantity: Number(cartItem.quantity) + 1,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    id: updatedCartItem.id,
    name: updatedCartItem.name,
    description: updatedCartItem.description,
    category: updatedCartItem.category,
    image: updatedCartItem.image,
    price: updatedCartItem.price,
    quantity: updatedCartItem.quantity,
  });
});

const decQuantity = asyncHandler(async (req, res) => {
  const cartItem = await Cart.findOne({
    user: req.user.id,
    _id: req.params.id,
  });

  const updatedCartItem = await Cart.findOneAndUpdate(
    {
      user: req.user.id,
      _id: req.params.id,
    },
    {
      quantity: Number(cartItem.quantity) - 1,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    id: updatedCartItem.id,
    name: updatedCartItem.name,
    description: updatedCartItem.description,
    category: updatedCartItem.category,
    image: updatedCartItem.image,
    price: updatedCartItem.price,
    quantity: updatedCartItem.quantity,
  });
});

const deleteCartItem = asyncHandler(async (req, res) => {
  await Cart.findOneAndDelete({
    user: req.user.id,
    _id: req.params.id,
  });

  res.status(200).json({
    message: `cartItem ${req.params.id} deleted from ${req.user.name}'s cart`,
  });
});

module.exports = {
  getCart,
  addToCart,
  incQuantity,
  decQuantity,
  deleteCartItem,
};
