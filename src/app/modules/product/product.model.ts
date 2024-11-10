// product.model.js or product.model.ts
import mongoose, { Schema } from 'mongoose';
import { IProduct } from './product.interface';

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    brand: { type: String, required: true },
    stock_quantity: { type: Number, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
