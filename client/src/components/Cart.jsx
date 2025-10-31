import React from 'react';
import { getProductImageSrc, getProductTitle, getProductText } from '../utils/productView';

const Cart = ({ carrito, onRemoveFromCart, onUpdateQuantity, onBack }) => {
  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      if (!item.precio) return total;
      
      const precio = typeof item.precio === 'string' 
        ? parseFloat(item.precio.replace(/[^0-9.-]+/g, ''))
        : item.precio;
      
      if (isNaN(precio)) return total;
      
      return total + (precio * item.cantidad);
    }, 0);
  };

  const formatearPrecio = (precio) => {
    if (!precio) return '$0';
    
    const precioNum = typeof precio === 'string' 
      ? parseFloat(precio.replace(/[^0-9.-]+/g, ''))
      : precio;
    
    if (isNaN(precioNum)) return '$0';
    
    return `$${precioNum.toLocaleString('es-AR')}`;
  };

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
                onClick={onBack}
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
              onClick={onBack}
            >
              ← Seguir comprando
            </button>
          </div>

          <div className="row">
            <div className="col-lg-8 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  {carrito.map((item) => (
                    <div key={item.id} className="row align-items-center mb-3 pb-3 border-bottom">
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
                            onClick={() => onUpdateQuantity(item.id, item.cantidad - 1)}
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
                            onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
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
                          onClick={() => onRemoveFromCart(item.id)}
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
                    <strong>{calcularTotal() > 0 ? formatearPrecio(calcularTotal()) : 'A consultar'}</strong>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2 text-muted">
                    <span>Envío</span>
                    <span>A calcular</span>
                  </div>
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between mb-4">
                    <h5>Total</h5>
                    <h5 style={{ color: 'var(--color-siena-tostado)' }}>
                      {calcularTotal() > 0 ? formatearPrecio(calcularTotal()) : 'A consultar'}
                    </h5>
                  </div>
                  
                  <button 
                    className="btn btn-success w-100 btn-lg mb-2"
                    style={{ 
                      backgroundColor: 'var(--color-siena-tostado)', 
                      borderColor: 'var(--color-siena-tostado)' 
                    }}
                    disabled
                  >
                    Finalizar compra
                  </button>
                  
                  <p className="text-muted small text-center mb-0">
                    <em>* La compra aún no está disponible (backend pendiente)</em>
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
