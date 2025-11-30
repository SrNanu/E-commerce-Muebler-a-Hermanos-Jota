import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById } from '../utils/productApi';
import { getProductImageSrc, getProductTitle, getProductText } from '../utils/productView';
import '../styles/ProductDetail.css';

const ProductDetail = ({ onAddToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err.message || 'Producto no encontrado');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="no-results">
          <div className="no-results-icon">⚠️</div>
          <h2 className="no-results-title">Producto no encontrado</h2>
          <p className="no-results-text">{error}</p>
          <button className="no-results-btn" onClick={() => navigate('/productos')}>
            <i className="bi bi-arrow-left"></i>
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="breadcrumb-modern">
          <Link to="/">Inicio</Link>
          <span className="separator">/</span>
          <Link to="/productos">Productos</Link>
          <span className="separator">/</span>
          <span className="active">{getProductTitle(product)}</span>
        </div>

        <div className="product-detail-grid">
          <div className="product-detail-images">
            <div className="product-main-image">
              <img src={getProductImageSrc(product)} alt={getProductTitle(product)} />
              {product.destacado && (
                <span className="product-image-badge">⭐ Destacado</span>
              )}
            </div>
          </div>

          <div className="product-detail-info">
            {product.categoria && (
              <span className="product-category-tag">{product.categoria}</span>
            )}
            
            <h1 className="product-detail-title">{getProductTitle(product)}</h1>
            
            <div className="product-rating">
              <div className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
              </div>
              <span className="rating-count">(4.5 • 128 reseñas)</span>
            </div>

            {product.precio && (
              <div className="product-price-section">
                <h2 className="product-price">
                  ${product.precio.toLocaleString('es-AR')}
                </h2>
                <p className="price-subtitle">
                  <i className="bi bi-credit-card me-2"></i>
                  Precio en efectivo o transferencia
                </p>
              </div>
            )}

            <div className="product-description">
              <h3>Descripción</h3>
              <p>{getProductText(product)}</p>
            </div>

            {product.atributos && product.atributos.length > 0 && (
              <div className="product-features">
                <h3>Características</h3>
                <div className="features-grid">
                  {product.atributos.map((attr, index) => (
                    <div key={index} className="feature-item">
                      <i className="bi bi-check-circle-fill"></i>
                      <span><strong>{attr.nombre}:</strong> {attr.valor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="product-actions">
              <button className="btn-add-cart" onClick={() => onAddToCart(product)}>
                <i className="bi bi-cart-plus"></i>
                Añadir al Carrito
              </button>
              <button className="btn-wishlist">
                <i className="bi bi-heart"></i>
              </button>
            </div>

            <div className="product-features">
              <div className="features-grid">
                <div className="feature-item">
                  <i className="bi bi-truck"></i>
                  <span>Envío gratis a todo el país</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-shield-check"></i>
                  <span>Garantía de 12 meses</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-arrow-clockwise"></i>
                  <span>Devolución en 30 días</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-credit-card"></i>
                  <span>Financiación sin interés</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-info-tabs">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Descripción Detallada
            </button>
            <button
              className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Especificaciones
            </button>
            <button
              className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Envío y Garantía
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div>
                <h4>Sobre este producto</h4>
                <p>{getProductText(product)}</p>
                <p>Este mueble ha sido cuidadosamente diseñado y fabricado con los más altos estándares de calidad. 
                   Cada pieza es única y está pensada para transformar tu espacio en un lugar acogedor y elegante.</p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <h4>Especificaciones Técnicas</h4>
                {product.atributos && product.atributos.length > 0 ? (
                  <ul>
                    {product.atributos.map((attr, index) => (
                      <li key={index}><strong>{attr.nombre}:</strong> {attr.valor}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay especificaciones técnicas disponibles.</p>
                )}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h4>Información de Envío</h4>
                <p><strong>Envío gratuito</strong> a todo el país en compras superiores a $50.000</p>
                <p><strong>Tiempo de entrega:</strong> 5-10 días hábiles</p>
                <h4 className="mt-4">Garantía</h4>
                <p>12 meses de garantía de fábrica contra defectos de fabricación</p>
                <p>Devolución sin cargo dentro de los 30 días posteriores a la compra</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
