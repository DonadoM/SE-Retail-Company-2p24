// src/models/product.ts
import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter the product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the product price"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter the product stock"],
  },
});

const Product = models.Product || model("Product", ProductSchema);
export default Product;
