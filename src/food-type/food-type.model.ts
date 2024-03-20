import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the document
interface IFoodType extends Document {
  name: string;
}

// Define the schema for the document
const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
});

// Create the Mongoose model
const FoodType = mongoose.model<IFoodType>('FoodType', ItemSchema);

export default FoodType;
