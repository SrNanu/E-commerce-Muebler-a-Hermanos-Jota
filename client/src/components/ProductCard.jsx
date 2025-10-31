import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  const { id, imagen, titulo, texto, precio } = product;

  return (
    <div className="col">
      <div className="card h-100 shadow-sm" style={{ transition: 'transform 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
        <Link to={`/productos/${id}`} style={{ textDecoration: 'none' }}>
          <img src={`http://localhost:4000/${imagen}`} className="card-img-top" alt={titulo} style={{ height: '200px', objectFit: 'cover' }} />
        </Link>
        <div className="card-body d-flex flex-column">
          <Link to={`/productos/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h5 className="card-title">{titulo}</h5>
          </Link>
          <p className="card-text text-muted small flex-grow-1">{texto.substring(0, 100)}...</p>
          {precio && (
            <div className="mt-auto pt-2">
              <h4 className="mb-0 fw-bold" style={{ color: '#D4A437' }}>
                ${precio.toLocaleString('es-AR')}
              </h4>
            </div>
          )}
        </div>
        <div className="card-footer bg-transparent border-0">
            <Link 
              to={`/productos/${id}`}
              className="btn w-100"
              style={{
                backgroundColor: '#8B4513',
                color: 'white',
                fontWeight: '600',
                transition: 'all 0.3s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#A0522D'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#8B4513'}
            >
              Ver detalle
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;