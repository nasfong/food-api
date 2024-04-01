// src/routes/food.ts
import express, { Request, Response } from 'express';
import Food from './food.model'; // Assuming you have a Food model defined similarly to the Item model
import fs from 'fs'
import path from 'path';
import { dir } from '../utils/upload';

// GET all food items
export const readAllData = async (req: Request, res: Response) => {
  try {
    let query = {};
    let page = req.query.page ? parseInt(req.query.page as string) : 1; // default page 1
    let pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10; // default page size 10

    if (req.query) {
      if (req.query.foodType) {
        query = { foodType: req.query.foodType }; // Case-insensitive search for foodType
      }
      if (req.query.id) {
        query = { _id: req.query.id }; // Case-insensitive search for _id
      }
      if (req.query.chef) {
        query = { chef: req.query.chef }; // Case-insensitive search for chef
      }
      // You can add more parameters similarly
    }

    const totalDocuments = await Food.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / pageSize);

    const food = await Food.find(query)
      .select('-__v')
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({
      data: food,
      totalPages: totalPages,
      currentPage: page
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export const readRandomData = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.params.limit);
    const randomFoodTypes = await Food.aggregate([
      { $sample: { size: limit } } // Sample 6 random documents
    ]);

    return res.status(200).json(randomFoodTypes);
  } catch (error) {
    return res.status(500).json({ error });
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
      chef: req.body.chef,
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
      const previousImagePath = `${dir}/${previousImage}`;
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
    if (req.body.description !== undefined) {
      food.description = req.body.description;
    }
    if (req.body.star !== undefined) {
      food.star = req.body.star;
    }
    if (req.body.price !== undefined) {
      food.price = req.body.price;
    }
    if (req.body.foodType !== undefined) {
      food.foodType = req.body.foodType;
    }
    if (req.body.chef !== undefined) {
      food.chef = req.body.chef;
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
