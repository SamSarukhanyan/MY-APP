import Sequelize from 'sequelize';


const env = process.env.NODE_ENV || 'development';
import configs from '../config/config.js';
import Admin from './Admin.js';
import Products from './products.js';

const config = configs[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Admin
db[Admin.name] = Admin(sequelize, Sequelize);

db[Products.name] = Products(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;



export default db;
