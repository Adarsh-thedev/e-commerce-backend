const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 250,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
    },

    category: {
      type: ObjectId,
      ref: "Category",
    },

    stock: Number,

    sold: {
      type: Number,
      default: 0,
    },

    photo: {
      type: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
