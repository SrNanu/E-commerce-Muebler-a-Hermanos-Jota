import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h2 className="mb-4">Catálogo</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
