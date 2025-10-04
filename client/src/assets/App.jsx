import React from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import '../styles/App.css';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="container py-4">
        <ProductList />
      </main>
    </div>
  );
}

export default App;
