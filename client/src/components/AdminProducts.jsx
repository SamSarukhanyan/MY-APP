import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import './styles.css';

const fetchAdminProducts = async () => {
  const token = localStorage.getItem('adminToken');
  const response = await axios.get('http://localhost:4600/api/admin/products', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};



const AdminProducts = ({ isLoggedIn  }) => {
  const { data: products, isLoading, isError } = useQuery('adminProducts', fetchAdminProducts);
  


  if (!isLoggedIn) {
    return null; // Если пользователь не аутентифицирован, не отображаем компонент
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div>
      <h2>Admin Products</h2>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-title">{product.title}</div>
            <div className="product-description">{product.description}</div>
            <div className="product-price">{product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;

