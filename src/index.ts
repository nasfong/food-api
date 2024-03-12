// src/index.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { routerFood } from './food/food.route';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://newuser:rening007@crud.057ti.mongodb.net/rest-food?retryWrites=true&w=majority', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.error(err));

app.use('/food', routerFood);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
