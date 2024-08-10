import { sendImageToCloudinary } from '../../utilities/SendImageToCloudinary';
import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDb = async (product: IProduct, file) => {
  console.log('file here', file);
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

const deleteProductAfterOrderFromDb = async (ids: string[]) => {
  const result = await Product.deleteMany({ _id: { $in: ids } });
  return result;
};

const getAllProduct = async () => {
  const query = {};
  const result = await Product.find(query);

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
export const productService = {
  getAllProduct,
  getSingleProduct,
  createProductIntoDb,
  deleteProduct,
  updateProductIntoDb,
  deleteProductAfterOrderFromDb,
};
