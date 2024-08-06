import { Product } from './product.model';

const getAllProduct = async () => {
  const query = {};
  const result = await Product.find(query);

  return result;
};

const getSingleProduct = async (id: string) => {
  const result = await Product.findById({ _id: id });

  return result;
};

export const productService = {
  getAllProduct,
  getSingleProduct,
};
