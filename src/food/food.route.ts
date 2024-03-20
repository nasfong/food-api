import { Router } from 'express'
import { createData, readAllData } from './food.controller'
import multer from 'multer';
import path from 'path';

const routerFood = Router()

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/'); // File uploads destination
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Multer file filter (optional)
const fileFilter = (req: any, file: any, cb: any) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

// Initialize multer upload with configuration
const upload = multer({ storage: storage, fileFilter: fileFilter });

routerFood.get('', readAllData)
routerFood.post('', upload.single('image'), createData)

export { routerFood }