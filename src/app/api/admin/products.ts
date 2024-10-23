// src/pages/api/admin/products.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/libs/mongodb";
import Product from "@/models/product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  switch (req.method) {
    case "GET":
      const products = await Product.find();
      res.status(200).json(products);
      break;
    case "POST":
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
      break;
    case "PUT":
      const { id, ...updateData } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json(updatedProduct);
      break;
    case "DELETE":
      const { id: deleteId } = req.body;
      await Product.findByIdAndDelete(deleteId);
      res.status(204).end();
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}