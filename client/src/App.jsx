import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import Cart from './components/Cart';
import './styles/App.css';

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [view, setView] = useState('home');
  const [carrito, setCarrito] = useState([]);

  const handleProductSelect = (id) => {
    setSelectedProductId(id);
    setView('products');
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  const handleNavigate = (nextView) => {
    setView(nextView);
    
    if (nextView !== 'products') {
      setSelectedProductId(null);
    }
  };

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
  };

  const handleRemoveFromCart = (productId) => {
    setCarrito(carrito.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCarrito(carrito.map(item => 
      item.id === productId 
        ? { ...item, cantidad: newQuantity }
        : item
    ));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar onNavigate={handleNavigate} cartItemCount={carrito.length} />
      <main className="py-0">
        {view === 'home' ? (
          <Home 
            onProductSelect={handleProductSelect}
            onNavigate={handleNavigate}
          />
        ) : view === 'cart' ? (
          <div className="container py-4">
            <Cart 
              carrito={carrito}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              onBack={() => handleNavigate('home')}
            />
          </div>
        ) : view === 'contact' ? (
          <div className="container py-4">
            <ContactForm />
          </div>
        ) : view === 'products' ? (
          selectedProductId ? (
            <div className="container py-4">
              <ProductDetail 
                productId={selectedProductId} 
                onBack={handleBackToList} 
                onAddToCart={handleAddToCart}
              />
            </div>
          ) : (
            <div className="container py-4">
              <ProductList onProductSelect={handleProductSelect} />
            </div>
          )
        ) : null}
      </main>
      <Footer />
    </div>
  );
}

export default App;
