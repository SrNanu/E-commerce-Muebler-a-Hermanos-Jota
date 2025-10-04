import '../styles/App.css'
import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/productos", {headers: {"Authorization": "muebles123"}})
      .then(res => {
          return res.json()
      })
      .then(data => {
        console.log(data)
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(`Error al cargar productos: ${err.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h1>Catálogo de Productos</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.titulo} - {p.id}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
