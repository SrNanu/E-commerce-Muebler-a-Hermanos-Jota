import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ProductDetail = ({ onAddToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/api/productos/${id}`, { headers: { "Authorization": "muebles123" } })
      .then(res => {
        if (!res.ok) {
          throw new Error('Producto no encontrado');
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center"><p>Cargando producto...</p></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return null;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 mb-4 mb-md-0">
          <img src={`http://localhost:4000/${product.imagen}`} className="img-fluid rounded shadow-sm" alt={product.titulo} />
        </div>
        <div className="col-md-6">
          <h1 className="titulo-principal">{product.titulo}</h1>
          <p className="texto lead" style={{ color: 'var(--color-siena-tostado)' }}>{product.texto}</p>
          
          {product.precio && (
            <div className="my-4">
              <h3 className="fw-bold" style={{ color: '#D4A437' }}>
                ${product.precio.toLocaleString('es-AR')}
              </h3>
              <p className="text-muted small mb-0">
                <i className="bi bi-credit-card me-1"></i>
                Precio en efectivo o débito
              </p>
            </div>
          )}
          
          <div className="mt-4">
            <h4 className="titulo-editorial" style={{color: 'var(--color-siena-tostado)'}}>Detalles</h4>
            <ul className="list-group list-group-flush">
              {product.atributos.map((attr, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center px-0" style={{ backgroundColor: 'transparent', color: 'var(--color-siena-tostado)' }}>
                  <strong>{attr.nombre}:</strong>
                  <span>{attr.valor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="d-flex gap-3 mt-4">
            <button 
              className="btn btn-success btn-lg" 
              onClick={() => onAddToCart(product)}
              style={{ 
                backgroundColor: 'var(--color-siena-tostado)', 
                borderColor: 'var(--color-siena-tostado)',
                color: 'var(--color-alabastro-calido)' 
              }}
            >
              🛒 Añadir al Carrito
            </button>
            <button 
              className="btn btn-outline-secondary" 
              onClick={() => navigate(-1)}
            >
              &larr; Volver
            </button>
            <Link to="/productos" className="btn btn-link">Ir al catálogo</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
