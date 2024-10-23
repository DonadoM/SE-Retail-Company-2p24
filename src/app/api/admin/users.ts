// src/pages/api/admin/users.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  switch (req.method) {
    case "GET":
      const users = await User.find();
      res.status(200).json(users);
      break;
    case "POST":
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
      break;
    case "PUT":
      const { id, ...updateData } = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json(updatedUser);
      break;
    case "DELETE":
      const { id: deleteId } = req.body;
      await User.findByIdAndDelete(deleteId);
      res.status(204).end();
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}