import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import './styles/App.css';

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [view, setView] = useState('products');

  const handleProductSelect = (id) => {
    setSelectedProductId(id);
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  const handleNavigate = (nextView) => {
    // Normalizamos Home y Productos a la vista de productos
    const normalized = nextView === 'home' ? 'products' : nextView;
    setView(normalized);
    // Al cambiar de vista, si no estamos en productos, limpiar selección
    if (normalized !== 'products') {
      setSelectedProductId(null);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar onNavigate={handleNavigate} />
      <main className="container py-4">
        {view === 'contact' ? (
          <ContactForm />
        ) : selectedProductId ? (
          <ProductDetail productId={selectedProductId} onBack={handleBackToList} />
        ) : (
          <ProductList onProductSelect={handleProductSelect} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
