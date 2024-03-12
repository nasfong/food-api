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
    return res.status(200).json({ data: food })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const createData = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Image file is required' });
  }
console.log(req.body)
  try {
    const compressedImage = await compressImage(req.file.buffer);
    const food = new Food({
      name: req.body.name,
      image: compressedImage,
      description: req.body.description
    });
    const newFood = await food.save();
    res.status(201).json(newFood);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
