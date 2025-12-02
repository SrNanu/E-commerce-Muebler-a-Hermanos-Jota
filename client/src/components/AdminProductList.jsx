import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../utils/productApi';
import { getProductId } from '../utils/productView';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';
import '../styles/ProductCard.css';

const AdminProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleting, setDeleting] = useState(null);

  // Cargar productos
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      setDeleting(productId);
      await deleteProduct(productId);
      
      // Remover producto de la lista
      setProducts(products.filter(p => getProductId(p) !== productId));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert(err.message || 'Error al eliminar el producto');
    } finally {
      setDeleting(null);
    }
  };

  const filteredProducts = products.filter(product => {
    const query = searchQuery.trim().toLowerCase();
    return (
      (product.nombre || '').toLowerCase().includes(query) ||
      (product.descripcion || '').toLowerCase().includes(query) ||
      (product.categoria && product.categoria.toLowerCase().includes(query))
    );
  });

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="product-list-title">Gestión de Productos</h1>
        <p className="product-list-subtitle">ADMINISTRACION DE PRODUCTOS</p>
      </div>

      {error && (
        <div className="no-results" style={{ paddingTop: 0 }}>
          <div className="no-results-icon">⚠️</div>
          <h2 className="no-results-title">Error al cargar productos</h2>
          <p className="no-results-text">{error}</p>
          <button className="no-results-btn" onClick={() => setError(null)}>
            Ocultar
            <i className="bi bi-x-circle"></i>
          </button>
        </div>
      )}

      <div className="product-list-content">
        <div className="product-list-filters">
          <div className="filters-row">
            <div className="filter-group">
              <label className="filter-label">Buscar</label>
              <input
                type="text"
                className="filter-input"
                placeholder="Buscar por nombre, descripción o categoría..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setSearchQuery(searchInput);
                  }
                }}
              />
            </div>

            <button className="filter-btn" onClick={() => setSearchQuery(searchInput)}>
              <i className="bi bi-search"></i>
              Buscar
            </button>

            <Link to="/admin/crear-producto" className="filter-btn" style={{ textDecoration: 'none' }}>
              <i className="bi bi-plus-circle"></i>
              Nuevo Producto
            </Link>
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
            <p className="no-results-text">Intenta ajustar tu búsqueda</p>
            <button className="no-results-btn" onClick={() => { setSearchInput(''); setSearchQuery(''); }}>
              <i className="bi bi-arrow-counterclockwise"></i>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const productId = getProductId(product);
              return (
                <ProductCard
                  key={productId}
                  product={product}
                  adminMode={true}
                  editLink={`/admin/editar-producto/${productId}`}
                  onDelete={() => handleDelete(productId)}
                  deleteDisabled={deleting === productId}
                />
              );
            })}
          </div>
        )}

        <div className="pagination-container" style={{ marginTop: '0' }}>
          <button className="no-results-btn" onClick={() => navigate('/')}>← Volver al inicio</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;
