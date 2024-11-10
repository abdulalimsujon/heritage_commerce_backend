import express from 'express';
const router = express.Router();
import { categetoryController } from './category.controller';

router.post('/create-category', categetoryController.createCategory);
router.delete('/delete-category/:name', categetoryController.deleteCategory);
router.patch('/update-category/', categetoryController.updateCategory);
router.get('/getAllCategories', categetoryController.allCategory);

export const categoryRouter = router;
