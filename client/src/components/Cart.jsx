import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getProductImageSrc, getProductTitle, getProductText, getProductId } from '../utils/productView';

const Cart = () => {
  const navigate = useNavigate();
  const { carrito, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { isAuthenticated, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const handleFinalizarCompra = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const productos = carrito.map(item => ({
        producto: getProductId(item),
        cantidad: item.cantidad
      }));

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productos })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear el pedido');
      }

      setSuccess(true);
      clearCart();

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/mis-pedidos');
      }, 2000);
    } catch (err) {
      console.error('Error al finalizar compra:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatearPrecio = (precio) => {
    if (!precio) return '$0';
    
    const precioNum = typeof precio === 'string' 
      ? parseFloat(precio.replace(/[^0-9.-]+/g, ''))
      : precio;
    
    if (isNaN(precioNum)) return '$0';
    
    return `$${precioNum.toLocaleString('es-AR')}`;
  };

  if (success) {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <div className="text-center py-5">
              <div className="mb-4">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
              </div>
              <h2 className="mb-4">¡Pedido realizado con éxito!</h2>
              <p className="text-muted mb-4">Te redirigiremos a la página principal...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (carrito.length === 0) {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <div className="text-center py-5">
              <h2 className="mb-4">Tu carrito está vacío</h2>
              <p className="text-muted mb-4">¡Agrega algunos productos para comenzar!</p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/productos')}
                style={{ 
                  backgroundColor: 'var(--color-siena-tostado)', 
                  borderColor: 'var(--color-siena-tostado)' 
                }}
              >
                Ver productos
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="titulo-principal">🛒 Mi Carrito</h2>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate('/productos')}
            >
              ← Seguir comprando
            </button>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          <div className="row">
            <div className="col-lg-8 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  {carrito.map((item) => (
                    <div key={getProductId(item)} className="row align-items-center mb-3 pb-3 border-bottom">
                      <div className="col-md-2 col-3">
                        {(() => {
                          const src = getProductImageSrc(item);
                          const alt = getProductTitle(item);
                          return (
                            <img 
                              src={src} 
                              alt={alt}
                              className="img-fluid rounded"
                              style={{ maxHeight: '80px', objectFit: 'cover' }}
                            />
                          );
                        })()}
                      </div>
                      <div className="col-md-4 col-9">
                        <h5 className="mb-1">{getProductTitle(item)}</h5>
                        <p className="text-muted mb-0 small">{getProductText(item)}</p>
                      </div>
                      <div className="col-md-2 col-4 text-center">
                        <div className="input-group input-group-sm">
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(getProductId(item), item.cantidad - 1)}
                            disabled={item.cantidad <= 1}
                          >
                            -
                          </button>
                          <input 
                            type="text" 
                            className="form-control text-center" 
                            value={item.cantidad}
                            readOnly
                            style={{ maxWidth: '50px' }}
                          />
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(getProductId(item), item.cantidad + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 col-4 text-center">
                        <strong>{item.precio ? formatearPrecio(item.precio) : 'Consultar'}</strong>
                      </div>
                      <div className="col-md-2 col-4 text-end">
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFromCart(getProductId(item))}
                          title="Eliminar del carrito"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="card-title mb-4">Resumen del pedido</h4>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal ({carrito.length} {carrito.length === 1 ? 'producto' : 'productos'})</span>
                    <strong>{getCartTotal() > 0 ? formatearPrecio(getCartTotal()) : 'A consultar'}</strong>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2 text-muted">
                    <span>Envío</span>
                    <span>A calcular</span>
                  </div>
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between mb-4">
                    <h5>Total</h5>
                    <h5 style={{ color: 'var(--color-siena-tostado)' }}>
                      {getCartTotal() > 0 ? formatearPrecio(getCartTotal()) : 'A consultar'}
                    </h5>
                  </div>
                  
                  {!isAuthenticated && (
                    <div className="alert alert-info small mb-3">
                      <i className="bi bi-info-circle"></i> Debes iniciar sesión para finalizar tu compra
                    </div>
                  )}
                  
                  <button 
                    className="btn btn-success w-100 btn-lg mb-2"
                    style={{ 
                      backgroundColor: 'var(--color-siena-tostado)', 
                      borderColor: 'var(--color-siena-tostado)' 
                    }}
                    onClick={handleFinalizarCompra}
                    disabled={loading || getCartTotal() === 0}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Procesando...
                      </>
                    ) : isAuthenticated ? (
                      'Finalizar compra'
                    ) : (
                      'Iniciar sesión para comprar'
                    )}
                  </button>
                  
                  <p className="text-muted small text-center mb-0">
                    <i className="bi bi-shield-check"></i> Compra 100% segura
                  </p>
                </div>
              </div>

              <div className="card shadow-sm mt-3">
                <div className="card-body">
                  <h6 className="card-title">
                    <i className="bi bi-shield-check"></i> Compra segura
                  </h6>
                  <ul className="list-unstyled small mb-0">
                    <li>✓ Envío a todo el país</li>
                    <li>✓ Garantía de fábrica</li>
                    <li>✓ Múltiples medios de pago</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
