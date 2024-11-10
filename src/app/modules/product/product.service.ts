/* eslint-disable @typescript-eslint/no-explicit-any */

import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utilities/SendImageToCloudinary';
import { IProduct } from './product.interface';
import mongoose, { ClientSession } from 'mongoose';
import { Product } from './product.model';
import { Express } from 'express';
import { Category } from '../category/category.model';

const createProductIntoDb = async (
  product: IProduct,
  file: Express.Multer.File & { path?: string },
) => {
  // Start a session for the transaction
  const session: ClientSession = await mongoose.startSession();
  session.startTransaction();

  try {
    // Handle file upload and assign the image URL

    if (file) {
      const imageName = `${Math.floor(100 + Math.random() * 900)}`;
      const path = file.path;
      const { secure_url } = (await sendImageToCloudinary(imageName, path)) as {
        secure_url: string;
      };

      product.image = secure_url as string;
    } else {
      product.image = 'no image';
    }

    // Create the product in the database within the transaction
    const createdProduct = await Product.create([product], { session });

    // If the product has a category, update the corresponding category
    if (product.category) {
      await Category.findByIdAndUpdate(
        product.category,
        { $addToSet: { products: createdProduct[0]._id } }, // Add product ID to the category's products array
        { session, new: true }, // Use the session and return the updated category
      );
    }

    // Commit the transaction
    await session.commitTransaction();
    return createdProduct[0]; // Return the created product
  } catch (error) {
    // Rollback the transaction in case of an error

    await session.abortTransaction();
    throw error; // Rethrow the error to be handled elsewhere
  } finally {
    // End the session
    session.endSession();
  }
};
const deleteProductAfterOrderFromDb = async (
  cardInfo: { id: string; name: string; quantity: number }[],
) => {
  for (const item of cardInfo) {
    const result = await Product.findByIdAndUpdate(
      { _id: item.id },
      { $inc: { stock_quantity: -item.quantity } },
    );
    return result;
  }
};

const getAllProduct = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(['name', 'category', 'brand'])
    .filter()
    .productWithPriceRange()
    .getFields()
    .sort()
    .paginate()
    .fields();

  // Populate related fields, e.g., 'category' and 'brand'
  productQuery.modelQuery = productQuery.modelQuery.populate('category');

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleProduct = async (id: string) => {
  const result = await Product.findById({ _id: id });

  return result;
};

const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete({ _id: id });
  return result;
};
const updateProductIntoDb = async (
  product: Partial<IProduct>,
  file: Express.Multer.File & { path?: string },
  id: string,
) => {
  if (file) {
    const imageName = `${Math.floor(100 + Math.random() * 900)}`;
    const path = file?.path;
    const { secure_url } = (await sendImageToCloudinary(imageName, path)) as {
      secure_url: string;
    };

    product.image = secure_url as string;
  }
  console.log(file);

  const result = await Product.findByIdAndUpdate(id, product);
  return result;
};
const getLatestProducts = async () => {
  const result = await Product.find().sort({ createdAt: -1 }).limit(8);
  return result;
};

export const productService = {
  getAllProduct,
  getSingleProduct,
  createProductIntoDb,
  deleteProduct,
  updateProductIntoDb,
  getLatestProducts,
  deleteProductAfterOrderFromDb,
};
