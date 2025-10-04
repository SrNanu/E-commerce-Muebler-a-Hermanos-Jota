import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import './styles/App.css';

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductSelect = (id) => {
    setSelectedProductId(id);
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="container py-4">
        {selectedProductId ? (
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
