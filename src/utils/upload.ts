import multer from "multer";
import path from 'path';
import fs from 'fs';

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

export { upload, dir }