// src/routes/foodType.ts
import express, { Request, Response } from 'express';
import FoodType from './food-type.model'; // Assuming you have a FoodType model defined similarly to the Item model
import path from 'path';
import fs from 'fs'
import { dir } from '../utils/upload';


// GET all foodType items
export const readAllData = async (req: Request, res: Response) => {
  try {
    const foodType = await FoodType
      .find()
      .select('-__v')
    return res.status(200).json(foodType)
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
    const foodType = new FoodType({
      name: req.body.name,
      description: req.body.description,
      image: imageUrl,
    });
    const newFood = await foodType.save();
    res.status(201).json(newFood);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export const updateData = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const url = req.protocol + '://' + req.get("host") + '/uploads/';
    const foodType = await FoodType.findById(id);
    if (!foodType) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (req.file) {
      // Remove previous image file if it exists
      const previousImage = foodType.image.replace(url, "");
      const previousImagePath = `${dir}/${previousImage}`;
      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath);
      }
      foodType.image = url + req.file.filename;
    }

    if (req.body.name !== undefined) {
      foodType.name = req.body.name;
    }
    const updatedFood = await foodType.save();
    return res.status(200).json({
      status: 200,
      data: updatedFood
    });
  } catch (error) {
    console.error('Error updating data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const deleteData = async (req: Request, res: Response) => {
  try {
    const url = req.protocol + '://' + req.get("host") + '/uploads/'
    const id = req.params.id;
    const foodType = await FoodType.findByIdAndDelete(id);
    if (!foodType) {
      return res.status(404).json({ message: 'Not found' });
    }
    const image = foodType && foodType.image.replace(url, "") || ''
    const imagePath = `${dir}/${image}`
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      return res.status(200).json({ message: 'Deleted successfully' });
    } else {
      console.error(`Image not found at path: ${imagePath}`);
      return res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}