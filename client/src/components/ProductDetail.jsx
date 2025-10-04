import React, { useState, useEffect } from 'react';

const ProductDetail = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/api/productos/${productId}`, { headers: { "Authorization": "muebles123" } })
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
  }, [productId]);

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

          <button className="btn mt-4" onClick={onBack} style={{ backgroundColor: 'var(--color-siena-tostado)', color: 'var(--color-alabastro-calido)' }}>
            &larr; Volver al catálogo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
