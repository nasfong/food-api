import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the document
interface IOurNew extends Document {
  image: string;
  name: string
  content: string;
  date: string
}

// Define the schema for the document
const ItemSchema: Schema = new Schema({
  image: { type: String },
  name: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
});

// Create the Mongoose model
const OurNew = mongoose.model<IOurNew>('OurNew', ItemSchema);

export default OurNew;
