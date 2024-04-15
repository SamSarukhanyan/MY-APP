import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductsList from "./components/ProductsList";
import AdminLogin from "./components/AdminLogin";
import AdminProducts from "./components/AdminProducts";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  const navigate = useNavigate();
  // При загрузке компонента проверяем состояние аутентификации
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // После успешной аутентификации устанавливаем состояние и сохраняем его в localStorage
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    // При выходе из учетной записи сбрасываем состояние и очищаем localStorage
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminToken"); // Добавляем удаление токена администратора
    navigate('/login')
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route
          path="/admin/products"
          element={
            <AdminProducts isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
