// controllers/admin.js

import db from "../../models/index.js"; // Импорт модели продукта

export const getAdminProducts = async (req, res) => {
  try {
    const products = await db.Products.findAll(); // Получаем все продукты
    res.json(products);
  } catch (error) {
    console.error("Ошибка при получении списка продуктов:", error);
    res.status(500).send("Ошибка сервера");
  }
};

export const addProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const product = await db.Products.create({ name, price }); // Создаем новый продукт
    res.status(201).json(product);
  } catch (error) {
    console.error("Ошибка при добавлении продукта:", error);
    res.status(500).send("Ошибка сервера");
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const product = await db.Products.findByPk(id);
    if (!product) {
      return res.status(404).send("Продукт не найден");
    }
    product.name = name;
    product.price = price;
    await product.save();
    res.json(product);
  } catch (error) {
    console.error("Ошибка при обновлении продукта:", error);
    res.status(500).send("Ошибка сервера");
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await db.Products.findByPk(id);
    if (!product) {
      return res.status(404).send("Продукт не найден");
    }
    await product.destroy();
    res.send("Продукт успешно удален");
  } catch (error) {
    console.error("Ошибка при удалении продукта:", error);
    res.status(500).send("Ошибка сервера");
  }
};
