/* eslint-disable @typescript-eslint/no-explicit-any */

import QueryBuilder from '../../app/builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utilities/SendImageToCloudinary';
import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDb = async (product: IProduct, file) => {
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

const getProductBySearch = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(['name', 'category', 'brand'])
    .filter()
    .productWithPriceRange()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return { result, meta };
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
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return result;
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

const getProductWithPrice = async (price: number) => {
  // Expecting 'price' in query

  const result = await Product.find({
    $and: [{ price: { $gt: 0 } }, { price: { $lt: price } }],
  });

  return result.length;
};

export const productService = {
  getAllProduct,
  getSingleProduct,
  createProductIntoDb,
  deleteProduct,
  updateProductIntoDb,
  deleteProductAfterOrderFromDb,
  getProductBySearch,
  getProductWithPrice,
};
