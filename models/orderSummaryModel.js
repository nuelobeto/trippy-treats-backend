const { Schema, model } = require("mongoose");

const orderSummarySchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderSummary: {
      type: Array,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    cleared: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const OrderSummary = model("OrderSummary", orderSummarySchema);

module.exports = OrderSummary;
