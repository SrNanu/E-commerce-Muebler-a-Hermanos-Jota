import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import Cart from './components/Cart';
import AdminCreateProduct from './components/AdminCreateProduct';
import './styles/App.css';

function App() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);

  const handleAddToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    const existingProduct = carrito.find(item => item.id === product.id);
    
    if (existingProduct) {
      // Si ya existe, incrementar la cantidad
      setCarrito(carrito.map(item => 
        item.id === product.id 
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      // Si no existe, agregarlo con cantidad 1
      setCarrito([...carrito, { ...product, cantidad: 1 }]);
    }
    
    console.log('Producto agregado al carrito:', product);
    console.log('Carrito actualizado:', [...carrito, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCarrito(carrito.filter(item => item.id !== productId));
    console.log('Producto eliminado del carrito, ID:', productId);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCarrito(carrito.map(item => 
      item.id === productId 
        ? { ...item, cantidad: newQuantity }
        : item
    ));
    console.log('Cantidad actualizada para producto ID:', productId, 'Nueva cantidad:', newQuantity);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar cartItemCount={carrito.length} />
      <main className="py-0">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/productos"
            element={
              <div className="container py-4">
                <ProductList />
              </div>
            }
          />
          <Route
            path="/productos/:id"
            element={
              <div className="container py-4">
                <ProductDetail onAddToCart={handleAddToCart} />
              </div>
            }
          />
          <Route
            path="/contacto"
            element={
              <div className="container py-4">
                <ContactForm />
              </div>
            }
          />
          <Route
            path="/admin/crear-producto"
            element={
              <div className="container py-4">
                <AdminCreateProduct />
              </div>
            }
          />
          {/* Ruta opcional para el carrito para no romper UX existente */}
          <Route
            path="/carrito"
            element={
              <div className="container py-4">
                <Cart 
                  carrito={carrito}
                  onRemoveFromCart={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onBack={() => navigate('/productos')}
                />
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
