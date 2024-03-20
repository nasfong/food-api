// src/routes/food.ts
import express, { Request, Response } from 'express';
import Food from './food.model'; // Assuming you have a Food model defined similarly to the Item model
import { compressImage } from '../utils/utils';


// GET all food items
export const readAllData = async (req: Request, res: Response) => {
  try {
    const food = await Food
      .find()
      .select('-__v')
    return res.status(200).json(food)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const createData = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Image file is required' });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  try {
    const food = new Food({
      name: req.body.name,
      image: imageUrl, // Store only the filename
      description: req.body.description,
      star: req.body.star,
      price: req.body.price,
      foodType: req.body.foodType,
    });
    const newFood = await food.save();


    res.status(201).json({ ...newFood.toJSON() });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
