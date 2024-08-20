/* eslint-disable @typescript-eslint/no-explicit-any */

import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utilities/SendImageToCloudinary';
import { IProduct } from './product.interface';
import { Product } from './product.model';
import { Express } from 'express';

const createProductIntoDb = async (
  product: IProduct,
  file: Express.Multer.File & { path?: string },
) => {
  if (file) {
    const imageName = `${Math.floor(100 + Math.random() * 900)}`;
    const path = file?.path;
    const { secure_url } = (await sendImageToCloudinary(imageName, path)) as {
      secure_url: string;
    };

    product.image = secure_url as string;
  }
  const result = await Product.create(product);

  return result;
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
const updateProductIntoDb = async (body: Partial<IProduct>, id: string) => {
  const result = await Product.findByIdAndUpdate(id, body);
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
