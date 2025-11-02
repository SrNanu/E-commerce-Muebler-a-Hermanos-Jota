import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getAllProducts } from '../utils/productApi';
import { getProductTitle, getProductText, getProductId } from '../utils/productView';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
        setError(`Error al cargar productos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center"><p>Cargando productos...</p></div>;
  if (error) return <div className="alert alert-danger" role="alert">{error}</div>;

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = normalizedQuery
    ? products.filter(p => {
        const title = getProductTitle(p).toLowerCase();
        const text = getProductText(p).toLowerCase();
        return title.includes(normalizedQuery) || text.includes(normalizedQuery);
      })
    : products;

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  return (
    <div>
      <h2 className="mb-4">Catálogo</h2>
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control flex-grow-1 search-input"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <button
            type="button"
            className="btn btn-primary py-2 search-button"
            id="searchButton"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="alert alert-info">No se encontraron productos para "{searchQuery}".</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredProducts.map(product => (
            <ProductCard key={getProductId(product) || Math.random()} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
