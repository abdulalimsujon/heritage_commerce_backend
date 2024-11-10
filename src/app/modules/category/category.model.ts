import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }], // Use the registered model name
});

export const Category = mongoose.model('Category', CategorySchema);
