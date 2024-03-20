// src/index.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser from 'body-parser'
import { routerFood } from './food/food.route';
import { routerFoodType } from './food-type/food-type';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

app.use('/uploads', express.static('uploads'));
// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://newuser:rening007@crud.057ti.mongodb.net/rest-food?retryWrites=true&w=majority', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.error(err));

app.use('/food', routerFood);
app.use('/food-type', routerFoodType);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
