import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AdminCreateProduct from './components/AdminCreateProduct';
import AdminUsers from './components/AdminUsers';
import AdminEditProduct from './components/AdminEditProduct';
import AdminProductList from './components/AdminProductList';
import OrdersPage from './components/OrdersPage';
import AdminOrdersPage from './components/AdminOrdersPage';
import ScrollToTop from './components/ScrollToTop';
import './styles/App.css';


function App() {
  const { addToCart } = useCart();

  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      <Navbar />
      <main className="py-0">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
                <ProductDetail onAddToCart={addToCart} />
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
          <Route path="/carrito" element={<Cart />} />

          {/* Rutas protegidas */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mis-pedidos"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          {/* Rutas de administración (protegidas) */}
          <Route
            path="/admin/productos"
            element={
              <ProtectedRoute requireAdmin={true}>
                <div className="container py-4">
                  <AdminProductList />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute requireAdmin>
                <div className="container py-4">
                  <AdminUsers />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/crear-producto"
            element={
              <ProtectedRoute requireAdmin={true}>
                <div className="container py-4">
                  <AdminCreateProduct />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/editar-producto/:id"
            element={
              <ProtectedRoute requireAdmin={true}>
                <div className="container py-4">
                  <AdminEditProduct />
                </div>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/admin/ordenes"
            element={
              <ProtectedRoute requireAdmin={true}>
                <div className="container py-4"> 
                  <AdminOrdersPage />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
