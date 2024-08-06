import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { productService } from './product.service';
import httpStatus from 'http-status';

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

export const productController = {
  getSingleProduct,
  getAllProductFromDb,
};
