// src/models/Item.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the document
interface IGallery extends Document {
  image: string;
}

// Define the schema for the document
const ItemSchema: Schema = new Schema({
  image: { type: String, required: true },
});

// Create the Mongoose model
const Gallery = mongoose.model<IGallery>('Gallery', ItemSchema);

export default Gallery;
