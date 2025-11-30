import React from 'react';
import { Link } from 'react-router-dom';
import { getProductId, getProductImageSrc, getProductTitle, getProductText, getProductPrice } from '../utils/productView';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  const id = getProductId(product);
  const imagen = getProductImageSrc(product);
  const titulo = getProductTitle(product);
  const texto = getProductText(product);
  const precio = getProductPrice(product);

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <Link to={`/productos/${id}`}>
          <img src={imagen} className="product-card-image" alt={titulo} />
        </Link>
        {product.destacado && (
          <span className="product-card-badge">Destacado</span>
        )}
        <div className="product-card-overlay">
          <Link to={`/productos/${id}`} className="product-card-quick-view">
            Vista Rápida
            <i className="bi bi-eye"></i>
          </Link>
        </div>
      </div>
      
      <div className="product-card-body">
        {product.categoria && (
          <span className="product-card-category">{product.categoria}</span>
        )}
        
        <h3 className="product-card-title">
          <Link to={`/productos/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {titulo}
          </Link>
        </h3>
        
        <p className="product-card-description">{texto}</p>
        
        <div className="product-card-footer">
          {precio && (
            <h4 className="product-card-price">
              ${precio.toLocaleString('es-AR')}
            </h4>
          )}
          <Link to={`/productos/${id}`} className="product-card-btn">
            Ver más
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;