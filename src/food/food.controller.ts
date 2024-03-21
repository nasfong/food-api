// src/routes/food.ts
import express, { Request, Response } from 'express';
import Food from './food.model'; // Assuming you have a Food model defined similarly to the Item model
import { compressImage } from '../utils/utils';
import fs from 'fs'
import path from 'path';

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

export const updateData = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const url = req.protocol + '://' + req.get("host") + '/uploads/';

    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (req.file) {
      // Remove previous image file if it exists
      const previousImage = food.image.replace(url, "");
      const previousImagePath = path.join(__dirname, '../../uploads/', previousImage);
      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath);
      }

      // Update the image URL
      food.image = url + req.file.filename;
    }

    // Update other fields if provided
    if (req.body.name !== undefined) {
      food.name = req.body.name;
    }
    // Update other fields similarly

    const updatedFood = await food.save();
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
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      return res.status(404).json({ message: 'Not found' });
    }
    const image = food && food.image.replace(url, "") || ''
    const imagePath = path.join(__dirname, `../../uploads/${image}`);
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
