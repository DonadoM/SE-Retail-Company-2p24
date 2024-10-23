import { Schema, model, models } from "mongoose";

const InventorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter the inventory item name"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter the quantity"],
    min: [0, "Quantity cannot be negative"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the price"],
    min: [0, "Price cannot be negative"],
  },
}, { timestamps: true });

const Inventory = models.Inventory || model("Inventory", InventorySchema);

export default Inventory;