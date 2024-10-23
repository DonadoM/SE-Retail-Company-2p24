import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/user';
import {connectDB} from '@/libs/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const admins = await User.find({ role: 'admin' });
        res.status(200).json({ success: true, data: admins });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'POST':
      try {
        const newAdmin = new User({ ...req.body, role: 'admin' });
        await newAdmin.save();
        res.status(201).json({ success: true, data: newAdmin });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;

    case 'PUT':
      try {
        const { id, ...updateData } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: updatedUser });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: deletedUser });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
  }
}
  
