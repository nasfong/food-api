// src/routes/food.ts
import express, { Request, Response } from 'express';
import FoodType from './food-type.model'; // Assuming you have a FoodType model defined similarly to the Item model
import { compressImage } from '../utils/utils';


// GET all food items
export const readAllData = async (req: Request, res: Response) => {
  try {
    const food = await FoodType
      .find()
      .select('-__v')
    return res.status(200).json({ data: food })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const createData = async (req: Request, res: Response) => {
  try {
    const food = new FoodType({
      name: req.body.name,
    });
    const newFood = await food.save();
    res.status(201).json(newFood);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
