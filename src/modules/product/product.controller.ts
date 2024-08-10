import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { productService } from './product.service';
import httpStatus from 'http-status';

const createProduct = catchAsync(async (req, res) => {
  const data = req.body;
  const file = req.file;

  const result = await productService.createProductIntoDb(data, file);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All product retrived  successfully',
    data: result,
  });
});

const getAllProductFromDb = catchAsync(async (req, res) => {
  const result = await productService.getAllProduct();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All product retrived  successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await productService.getSingleProduct(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: ' product retrived  successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const id = req.body;
  const result = await productService.deleteProduct(id.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product is deleted Successfully',
    data: result,
  });
});
const deleteProductAfterOrder = catchAsync(async (req, res) => {
  const cartIds = req.body.cartIds;
  const result = await productService.deleteProductAfterOrderFromDb(cartIds);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products are deleted Successfully',
    data: result,
  });
});
const updateProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const reqbody = req.body;
  const result = await productService.updateProductIntoDb(reqbody, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product is updated Successfully',
    data: result,
  });
});

export const productController = {
  getSingleProduct,
  getAllProductFromDb,
  createProduct,
  deleteProduct,
  updateProduct,
  deleteProductAfterOrder,
};
