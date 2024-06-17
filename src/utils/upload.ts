import multer from "multer";
import path from 'path';
import fs from 'fs';
import sharp from "sharp";
import { NextFunction, Request, Response } from "express";

const dir = 'public/uploads'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir); // File uploads destination
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

const upload = multer({
  storage: storage, fileFilter: fileFilter,
  // limits: {
  //   fileSize: 300 * 1024
  // }
});

const compressImage = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next(); // Move to next middleware if no file is uploaded
  }

  try {
    const imagePath = path.join(dir, req.file.filename);
    await sharp(imagePath)
      .resize({ width: 800 }) // Set the maximum width
      .toFormat('jpeg') // Convert to JPEG format
      .toFile(`${imagePath}.compressed.jpg`); // Save compressed image

    // fs.unlinkSync(imagePath); // Remove original image
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting original image:", err);
        return res.status(400).json({ message: 'Failed to compress image' });
      }
      next();
    });
    req.file.filename = `${req.file.filename}.compressed.jpg`; // Update filename to compressed version
  } catch (error) {
    return res.status(400).json({ message: 'Failed to compress image' });
  }

  // next();
};

export { upload, dir, compressImage }