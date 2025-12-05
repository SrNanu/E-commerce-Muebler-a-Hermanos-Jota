import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutRequest = () => {
    setShowConfirm(true);
  };

  const handleLogoutConfirm = () => {
    clearCart();
    logout();
    navigate('/');
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (!user) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Mi Perfil</h2>
              
              <div className="mb-4">
                <div className="d-flex justify-content-center mb-4">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                       style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
                    {user.nombre.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Nombre</label>
                  <p className="form-control-plaintext border rounded p-2 bg-light">
                    {user.nombre}
                  </p>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <p className="form-control-plaintext border rounded p-2 bg-light">
                    {user.email}
                  </p>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Rol</label>
                  <p className="form-control-plaintext border rounded p-2 bg-light">
                    {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                  </p>
                </div>

                {user.createdAt && (
                  <div className="mb-3">
                    <label className="form-label fw-bold">Miembro desde</label>
                    <p className="form-control-plaintext border rounded p-2 bg-light">
                      {new Date(user.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>

              <div className="d-grid gap-2">
                {!showConfirm ? (
                  <button 
                    className="btn btn-danger"
                    onClick={handleLogoutRequest}
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <div className="alert alert-warning" role="alert">
                    Al cerrar sesión se vaciará tu carrito. ¿Deseas continuar?
                    <div className="mt-3 d-flex gap-2">
                      <button className="btn btn-danger" onClick={handleLogoutConfirm}>Sí, cerrar sesión</button>
                      <button className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
