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
//-----------------get product by name-------------------------------->
const getProductBySearch = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await productService.getProductBySearch(query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: ' product retrived  successfully',
    data: result,
  });
});

const getAllProductFromDb = catchAsync(async (req, res) => {
  const searchTerm = req.query;

  const result = await productService.getAllProduct(searchTerm);

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
const getproductWithPrice = catchAsync(async (req, res) => {
  const { price } = req.query;

  const convert = Number(price);

  const result = await productService.getProductWithPrice(convert);

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
  const reqbody = req.body.cartInfo;

  const result = await productService.deleteProductAfterOrderFromDb(reqbody);
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
  getProductBySearch,
  deleteProductAfterOrder,
  getproductWithPrice,
};
