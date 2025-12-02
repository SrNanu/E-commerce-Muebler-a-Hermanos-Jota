import React from 'react';
import '../styles/ProductCard.css';

const UserCard = ({ user, onChangeRole, updating = false }) => {
  if (!user) return null;

  const initials = (user.nombre || user.email || '?')
    .split(' ')
    .map(s => s[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="product-card">
      <div className="product-card-image-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '96px',
          height: '96px',
          borderRadius: '50%',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '1.25rem',
          color: 'var(--primary-color)',
          boxShadow: 'var(--shadow-sm)'
        }}>{initials}</div>
      </div>

      <div className="product-card-body">
        <span className="product-card-category">{user.role === 'admin' ? 'Administrador' : 'Usuario'}</span>
        <h3 className="product-card-title">{user.nombre || 'Sin nombre'}</h3>
        <p className="product-card-description">{user.email}</p>

        <div className="product-card-footer" style={{ alignItems: 'center' }}>
          <span className="product-card-price" style={{ fontSize: '1rem' }}>{user.role}</span>
          <select
            className="filter-select"
            value={user.role}
            onChange={(e) => onChangeRole && onChangeRole(user._id, e.target.value)}
            disabled={updating}
            style={{ maxWidth: '180px' }}
          >
            <option value="user">Usuario</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
