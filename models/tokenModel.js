const { Schema, model } = require("mongoose");

const tokenSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
});
const Token = model("Token", tokenSchema);
module.exports = Token;
