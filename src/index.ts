// src/index.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser from 'body-parser'
import { routerFood } from './food/food.route';
import { routerFoodType } from './food-type/food-type.route';
import { routerGallery } from './gallery/gallery.route';
import { routerComment } from './comment/comment.route';
import { routerOurNew } from './our-new/our-new.route';
import * as dotenv from 'dotenv';
import { routerEmail } from './email/email';

dotenv.config()

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || ''

app.use('/uploads', express.static('uploads'));
// Connect to MongoDB using Mongoose
mongoose.connect(DATABASE_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.error(err));

app.use('/food', routerFood);
app.use('/food-type', routerFoodType);
app.use('/gallery', routerGallery);
app.use('/comment', routerComment);
app.use('/our-new', routerOurNew);
app.use('/email', routerEmail);
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
