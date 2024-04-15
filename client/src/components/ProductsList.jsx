import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import "./styles.css";

const fetchProductsList = async () => {
  const { data } = await axios.get("http://localhost:4600/api/products", {});
  return data;
};

const ProductsList = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery("productsList", fetchProductsList);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

 return (
  <div>
    <h2>Products List</h2>
    <div className="products-container">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-title">{product.title}</div>
            <div className="product-description">{product.description}</div>
            <div className="product-price">{product.price}</div>
          </div>
        ))
      ) : (
        <div>Пока нет продуктов</div>
      )}
    </div>
  </div>
);
};

export default ProductsList;
