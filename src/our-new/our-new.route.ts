import { Router } from 'express'
import { createData, deleteData, readAllData, updateData } from './our-new.controller'
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

const routerOurNew = Router()

routerOurNew.get('', readAllData)
routerOurNew.post('', upload.single('image'), createData)
routerOurNew.put('/:id', upload.single('image'), updateData)
routerOurNew.delete('/:id', deleteData)


export { routerOurNew }