/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDb = async (category: ICategory) => {
  const result = await Category.create(category);

  return result;
};

const deleteCategoryFromDb = async (name: string) => {
  const result = await Category.deleteOne({ name: name });

  return result;
};

const editNameFromDb = async ({
  oldName,
  newName,
}: {
  oldName: string;
  newName: string;
}) => {
  try {
    const result = await Category.updateOne(
      { name: oldName }, // Find the category by its current name
      { $set: { name: newName } }, // Set the new name
    );

    if (result.modifiedCount > 0) {
      console.log('Category name updated successfully');
    } else {
      console.log(
        'No category was updated; it may not exist or the name may be the same',
      );
    }
    return result;
  } catch (error) {
    console.error('Error updating category name:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
};
const getAllCategory = async () => {
  // Fetch all categories and populate the products field
  const categories = await Category.find().populate('products');

  // Transform the result to only include category names and product names
  const transformedCategories = categories.map((category) => ({
    name: category.name,
    _id: category.id,
    products: category.products.map((product: any) => product.name), // Extract only product names
  }));

  return transformedCategories;
};

export const categoryServices = {
  createCategoryIntoDb,
  getAllCategory,
  editNameFromDb,
  deleteCategoryFromDb,
};
