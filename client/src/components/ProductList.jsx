import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/productos", { headers: { "Authorization": "muebles123" } })
      .then(res => {
        if (!res.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(`Error al cargar productos: ${err.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center"><p>Cargando productos...</p></div>;
  if (error) return <div className="alert alert-danger" role="alert">{error}</div>;

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = normalizedQuery
    ? products.filter(p => {
        const title = (p.titulo || "").toLowerCase();
        const text = (p.texto || "").toLowerCase();
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
