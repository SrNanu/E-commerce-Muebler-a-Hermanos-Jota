import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getAllProducts } from '../utils/productApi';
import { getProductTitle, getProductText, getProductId } from '../utils/productView';
import '../styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

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

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-container">
        <div className="no-results">
          <div className="no-results-icon">⚠️</div>
          <h2 className="no-results-title">Error al cargar productos</h2>
          <p className="no-results-text">{error}</p>
        </div>
      </div>
    );
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = products.filter(p => {
    const matchesSearch = normalizedQuery
      ? getProductTitle(p).toLowerCase().includes(normalizedQuery) ||
        getProductText(p).toLowerCase().includes(normalizedQuery)
      : true;
    
    const matchesCategory = categoryFilter
      ? p.categoria === categoryFilter
      : true;

    return matchesSearch && matchesCategory;
  });

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearchQuery("");
    setCategoryFilter("");
  };

  const categories = [...new Set(products.map(p => p.categoria).filter(Boolean))];

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="product-list-title">Nuestro Catálogo</h1>
        <p className="product-list-subtitle">
          Explora nuestra colección completa de muebles de alta calidad
        </p>
      </div>

      <div className="product-list-content">
        <div className="product-list-filters">
          <div className="filters-row">
            <div className="filter-group">
              <label className="filter-label">Buscar</label>
              <input
                type="text"
                className="filter-input"
                placeholder="Buscar productos..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
              />
            </div>

            {categories.length > 0 && (
              <div className="filter-group">
                <label className="filter-label">Categoría</label>
                <select
                  className="filter-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            )}

            <button className="filter-btn" onClick={handleSearch}>
              <i className="bi bi-search"></i>
              Buscar
            </button>

            {(searchQuery || categoryFilter) && (
              <button className="filter-btn filter-btn-clear" onClick={handleClearFilters}>
                <i className="bi bi-x-circle"></i>
                Limpiar
              </button>
            )}
          </div>
        </div>

        <div className="product-list-results">
          <span className="results-count">
            Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> productos
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h2 className="no-results-title">No se encontraron productos</h2>
            <p className="no-results-text">
              Intenta ajustar tus filtros de búsqueda
            </p>
            <button className="no-results-btn" onClick={handleClearFilters}>
              <i className="bi bi-arrow-counterclockwise"></i>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={getProductId(product) || Math.random()} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
