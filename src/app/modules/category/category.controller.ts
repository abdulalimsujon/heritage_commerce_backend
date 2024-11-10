import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { categoryServices } from './categetory.service';

const createCategory = catchAsync(async (req, res) => {
  const reqbody = req.body;
  const result = await categoryServices.createCategoryIntoDb(reqbody);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products are deleted Successfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const reqbody = req.body;
  console.log(reqbody);
  const result = await categoryServices.editNameFromDb(reqbody);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products are deleted Successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const name = req.params.name;
  const result = await categoryServices.deleteCategoryFromDb(name as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category deleted Successfully',
    data: result,
  });
});
const allCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategory();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products are deleted Successfully',
    data: result,
  });
});

export const categetoryController = {
  createCategory,
  allCategory,
  updateCategory,
  deleteCategory,
};
