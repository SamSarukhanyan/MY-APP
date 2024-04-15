// controllers/products.js
import db from '../../models/index.js'; // Импорт модели продукта

const getProducts = async (req, res) => {
    try {
        const products = await db.Products.findAll(); // Получаем все продукты
        res.json(products);
        
    } catch (error) {
        console.error('Ошибка при получении списка продуктов:', error);
        res.status(500).send('Ошибка сервера');
    }
};

export { getProducts };
