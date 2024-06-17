// src/models/Item.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the document
interface IFood extends Document {
  name: string;
  image: string;
  description: string;
  star: number
  price: number
  foodType: mongoose.Types.ObjectId
  chef: boolean
  promotion: boolean
}

// Define the schema for the document
const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  star: { type: Number },
  price: { type: Number },
  foodType: { type: Schema.Types.ObjectId, ref: 'FoodType', required: true },
  chef: { type: Boolean, default: false },
  promotion: { type: Boolean, default: false },
});

// Create the Mongoose model
const Food = mongoose.model<IFood>('Food', ItemSchema);

export default Food;
