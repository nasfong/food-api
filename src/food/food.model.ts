// src/models/Item.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the document
interface FoodType extends Document {
  name: string;
  image: string;
  description: string;
}

// Define the schema for the document
const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});

// Create the Mongoose model
const Food = mongoose.model<FoodType>('Food', ItemSchema);

export default Food;
