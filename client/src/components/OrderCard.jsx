import React from 'react';
import '../styles/ProductCard.css';

const statusLabel = (estado) => {
  switch (estado) {
    case 'pendiente': return 'Pendiente';
    case 'procesando': return 'Procesando';
    case 'enviado': return 'Enviado';
    case 'entregado': return 'Entregado';
    case 'cancelado': return 'Cancelado';
    default: return estado || '—';
  }
};

const OrderCard = ({ order, adminMode = false, onUpdateStatus }) => {
  if (!order) return null;

  const idText = (order.numero || order._id || '').toString().toUpperCase();
  const fecha = order.createdAt ? new Date(order.createdAt).toLocaleDateString('es-AR') : '—';
  const total = order.total ? `$${Number(order.total).toLocaleString('es-AR')}` : '$0';
  const cliente = order.usuario?.nombre || order.usuario?.email || 'N/A';

  return (
    <div className="product-card">
      <div className="product-card-image-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '110px',
          height: '110px',
          borderRadius: '20px',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '1.1rem',
          color: 'var(--primary-color)',
          boxShadow: 'var(--shadow-sm)'
        }}>#{idText}</div>
      </div>

      <div className="product-card-body">
        <span className="product-card-category">{statusLabel(order.estado)}</span>
        <h3 className="product-card-title">{cliente}</h3>
        <p className="product-card-description">Fecha: {fecha}</p>

        <div className="product-card-footer" style={{ alignItems: 'center' }}>
          <h4 className="product-card-price" style={{ fontSize: '1.25rem' }}>{total}</h4>
          {adminMode ? (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {order.estado === 'pendiente' && (
                <button className="product-card-btn" onClick={() => onUpdateStatus && onUpdateStatus(order._id, 'procesando')}>Procesar<i className="bi bi-gear"></i></button>
              )}
              {order.estado === 'procesando' && (
                <button className="product-card-btn" onClick={() => onUpdateStatus && onUpdateStatus(order._id, 'enviado')}>Enviar<i className="bi bi-truck"></i></button>
              )}
              {order.estado === 'enviado' && (
                <button className="product-card-btn" onClick={() => onUpdateStatus && onUpdateStatus(order._id, 'entregado')}>Entregar<i className="bi bi-check2-circle"></i></button>
              )}
              {order.estado !== 'cancelado' && order.estado !== 'entregado' && (
                <button className="product-card-btn" onClick={() => onUpdateStatus && onUpdateStatus(order._id, 'cancelado')}>Cancelar<i className="bi bi-x-circle"></i></button>
              )}
            </div>
          ) : (
            <div style={{ color: 'var(--text-light)', fontWeight: 600 }}>Estado: {statusLabel(order.estado)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
