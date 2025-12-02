import React from 'react';
import { Link } from 'react-router-dom';
import { getProductId, getProductImageSrc, getProductTitle, getProductText, getProductPrice } from '../utils/productView';
import '../styles/ProductCard.css';

const ProductCard = ({ product, adminMode = false, editLink, onDelete, deleteDisabled = false }) => {
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
          {!adminMode && (
            <Link to={`/productos/${id}`} className="product-card-quick-view">
              Vista Rápida
              <i className="bi bi-eye"></i>
            </Link>
          )}
          {adminMode && (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.75rem' }}>
              {editLink && (
                <Link to={editLink} className="product-card-btn">
                  Editar
                  <i className="bi bi-pencil"></i>
                </Link>
              )}
              {onDelete && (
                <button className="product-card-btn" onClick={onDelete} disabled={deleteDisabled}>
                  {deleteDisabled ? 'Eliminando…' : 'Eliminar'}
                  <i className="bi bi-trash"></i>
                </button>
              )}
            </div>
          )}
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
          {!adminMode && (
            <Link to={`/productos/${id}`} className="product-card-btn">
              Ver más
              <i className="bi bi-arrow-right"></i>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;