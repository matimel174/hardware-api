import { Router } from 'express';
import {
  getProducts, getProduct, createProduct, deleteProduct
} from '../controllers/products.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/create', authenticate, createProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;