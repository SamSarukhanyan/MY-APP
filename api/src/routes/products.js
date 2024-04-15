// productsRoutes.js
import express from 'express';
import { getProducts } from '../controllers/products/products.js';

const router = express.Router();

// Маршрут для получения продуктов, доступный для всех пользователей
router.get('/products', getProducts);

export default router;