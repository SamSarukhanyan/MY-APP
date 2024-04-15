// routes/adminRoutes.js
import express from "express";
import {
  getAdminProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/admin/admin.js";

const router = express.Router();

// Маршрут для получения всех продуктов для администратора
router.get("/products", getAdminProducts);

// Маршруты для административных действий с продуктами
router.post("/add-product", addProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
