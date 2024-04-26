// src/routes/gallery.ts
import express, { Request, Response } from 'express';
import Gallery from './gallery.model'; // Assuming you have a Gallery model defined similarly to the Item model
import fs from 'fs'
import { dir } from '../utils/upload';

export const readAllData = async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery
      .find()
      .select('-__v')
    return res.status(200).json(gallery)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const createData = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Image file is required' });
  }
  if (req.file.size > 0.3 * 1024 * 1024) {
    return res.status(400).json({ message: 'File size 300KB exceeds the limit' });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  try {
    const gallery = new Gallery({
      image: imageUrl, // Store only the filename
    });
    const newData = await gallery.save();


    res.status(201).json({ ...newData.toJSON() });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateData = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const url = req.protocol + '://' + req.get("host") + '/uploads/';

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (req.file && req.file.size > 0.3 * 1024 * 1024) {
      return res.status(400).json({ message: 'File size exceeds the limit' });
    }
    
    if (req.file) {
      // Remove previous image file if it exists
      const previousImage = gallery.image.replace(url, "");
      const previousImagePath = `${dir}/${previousImage}`;
      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath);
      }

      // Update the image URL
      gallery.image = url + req.file.filename;
    }

    const updated = await gallery.save();
    return res.status(200).json({
      status: 200,
      data: updated
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
    const gallery = await Gallery.findByIdAndDelete(id);
    if (!gallery) {
      return res.status(404).json({ message: 'Not found' });
    }
    const image = gallery && gallery.image.replace(url, "") || ''
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
