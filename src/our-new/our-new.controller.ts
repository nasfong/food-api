import { Request, Response } from 'express';
import OurNew from './our-new.model';
import path from 'path';
import fs from 'fs'
import { dir } from '../utils/upload';

export const readAllData = async (req: Request, res: Response) => {
  try {
    const ourNew = await OurNew
      .find()
      .select('-__v')
    return res.status(200).json(ourNew)
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
    const ourNew = new OurNew({
      image: imageUrl,
      name: req.body.name,
      content: req.body.content,
      date: req.body.date,
    });
    const newOurNew = await ourNew.save();
    res.status(201).json(newOurNew);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export const updateData = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const url = req.protocol + '://' + req.get("host") + '/uploads/';
    const ourNew = await OurNew.findById(id);
    if (!ourNew) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (req.file) {
      // Remove previous image file if it exists
      const previousImage = ourNew.image.replace(url, "");
      const previousImagePath = `${dir}/${previousImage}`;
      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath);
      }
      ourNew.image = url + req.file.filename;
    }

    if (req.body.name !== undefined) {
      ourNew.name = req.body.name;
    }
    if (req.body.content !== undefined) {
      ourNew.content = req.body.content;
    }
    if (req.body.date !== undefined) {
      ourNew.date = req.body.date;
    }
    const updatedOurNew = await ourNew.save();
    return res.status(200).json({
      status: 200,
      data: updatedOurNew
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
    const ourNew = await OurNew.findByIdAndDelete(id);
    if (!ourNew) {
      return res.status(404).json({ message: 'Not found' });
    }
    const image = ourNew && ourNew.image.replace(url, "") || ''
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