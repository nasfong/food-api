import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the document
interface IComment extends Document {
  name: string;
  comment: string;
  email: string;
  star: number;
  food: mongoose.Types.ObjectId
}

// Define the schema for the document
const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  email: { type: String },
  star: { type: Number },
  food: { type: Schema.Types.ObjectId, ref: 'Food', required: true },
});

// Create the Mongoose model
const Comment = mongoose.model<IComment>('Comment', ItemSchema);

export default Comment;
