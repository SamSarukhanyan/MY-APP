

const Products = (sequelize, DataTypes) => {
   const model = sequelize.define(
     "Products",
     {
       id: {
         type: DataTypes.BIGINT,
         allowNull: false,
         primaryKey: true
        
       },
       title: {
         type: DataTypes.STRING,
         allowNull: false,
       },
       description: {
         type: DataTypes.STRING,
         allowNull: false,
       },
       price: {
         type: DataTypes.INTEGER,
         allowNull: false,
       },
     },
     {
       timestamps: false,
       tableName: "products",
     }
   );
 
   return model;
 };
 
 export default Products;
 