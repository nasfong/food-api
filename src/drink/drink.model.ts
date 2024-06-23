// src/models/Item.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the document
interface IDrink extends Document {
  name: string;
  image: string;
  drinks: { name: string, price: number }[]
}

// Define the schema for the document
const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  drinks: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ]
});

// Create the Mongoose model
const Drink = mongoose.model<IDrink>('Drink', ItemSchema);

export default Drink;
