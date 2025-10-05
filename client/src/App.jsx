import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import Cart from './components/Cart';
import './styles/App.css';

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [view, setView] = useState('products');
  const [carrito, setCarrito] = useState([]);

  const handleProductSelect = (id) => {
    setSelectedProductId(id);
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  const handleNavigate = (nextView) => {

    const normalized = nextView === 'home' ? 'products' : nextView;
    setView(normalized);

    if (normalized !== 'products') {
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
      <Navbar onNavigate={handleNavigate} cartItemCount={carrito.length} />
      <main className="container py-4">
        {view === 'cart' ? (
          <Cart 
            carrito={carrito}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onBack={() => handleNavigate('products')}
          />
        ) : view === 'contact' ? (
          <ContactForm />
        ) : selectedProductId ? (
          <ProductDetail 
            productId={selectedProductId} 
            onBack={handleBackToList} 
            onAddToCart={handleAddToCart}
          />
        ) : (
          <ProductList onProductSelect={handleProductSelect} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
