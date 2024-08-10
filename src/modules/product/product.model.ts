import mongoose, { Schema } from 'mongoose';
import { IProduct } from './product.interface';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  stock_quantity: { type: Number, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String },
});

export const Product = mongoose.model<IProduct>('product', ProductSchema);
