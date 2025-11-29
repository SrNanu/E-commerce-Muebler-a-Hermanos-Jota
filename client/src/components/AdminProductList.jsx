import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../utils/productApi';
import { getProductId, getProductImageSrc } from '../utils/productView';

const AdminProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    const query = searchQuery.toLowerCase();
    return (
      product.nombre.toLowerCase().includes(query) ||
      product.descripcion.toLowerCase().includes(query) ||
      (product.categoria && product.categoria.toLowerCase().includes(query))
    );
  });

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración</h2>
        <Link 
          to="/admin/crear-producto" 
          className="btn btn-success"
        >
          + Nuevo Producto
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError(null)}
          ></button>
        </div>
      )}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre, descripción o categoría..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="alert alert-info">
          {searchQuery 
            ? `No se encontraron productos para "${searchQuery}".`
            : 'No hay productos registrados.'}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th width="60">Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th width="100">Precio</th>
                <th width="80">Stock</th>
                <th width="120">Categoría</th>
                <th width="120">Destacado</th>
                <th width="150">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const productId = getProductId(product);
                const imagen = getProductImageSrc(product);

                return (
                  <tr key={productId}>
                    <td>
                      {imagen && (
                        <img
                          src={imagen}
                          alt={product.nombre}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }}
                        />
                      )}
                    </td>
                    <td className="fw-bold">{product.nombre}</td>
                    <td className="text-muted small">
                      {product.descripcion.substring(0, 40)}...
                    </td>
                    <td className="fw-bold text-success">
                      ${parseFloat(product.precio).toLocaleString('es-AR')}
                    </td>
                    <td>
                      <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <small className="text-muted">{product.categoria || '—'}</small>
                    </td>
                    <td>
                      {product.destacado ? (
                        <span 
                          className="badge"
                          style={{ backgroundColor: '#D4A437' }}
                        >
                          Sí
                        </span>
                      ) : (
                        <span className="badge bg-secondary">No</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <Link
                          to={`/admin/editar-producto/${productId}`}
                          className="btn btn-outline-primary"
                          title="Editar"
                        >
                          ✎ Editar
                        </Link>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(productId)}
                          disabled={deleting === productId}
                          title="Eliminar"
                        >
                          {deleting === productId ? '⏳' : '🗑'} Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/')}
        >
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default AdminProductList;
