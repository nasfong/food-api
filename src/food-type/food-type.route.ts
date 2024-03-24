import { Router } from 'express'
import { createData, deleteData, readAllData, updateData } from './food-type.controller'
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // File uploads destination
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

const upload = multer({ storage: storage, fileFilter: fileFilter });

const routerFoodType = Router()

routerFoodType.get('', readAllData)
routerFoodType.post('', upload.single('image'), createData)
routerFoodType.put('/:id', upload.single('image'), updateData)
routerFoodType.delete('/:id', deleteData)


export { routerFoodType }