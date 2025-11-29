import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminUsers = () => {
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const remote = import.meta.env.VITE_API_BASE_URL;
    const local = 'http://localhost:4000';
    const tryBases = remote && remote !== local ? [remote, local] : [local];
    try {
      let lastErr = null;
      for (const base of tryBases) {
        try {
          const res = await fetch(`${base}/api/auth/users`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
          setUsers(data.users);
          setMessage(null);
          return;
        } catch (e) {
          lastErr = e;
        }
      }
      throw lastErr || new Error('No se pudo obtener usuarios');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (id, newRole) => {
    setUpdatingId(id);
    setMessage(null);
    const remote = import.meta.env.VITE_API_BASE_URL;
    const local = 'http://localhost:4000';
    const tryBases = remote && remote !== local ? [remote, local] : [local];
    try {
      let lastErr = null;
      for (const base of tryBases) {
        try {
          const res = await fetch(`${base}/api/auth/users/${id}/role`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ role: newRole })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
          setMessage(`Rol actualizado: ${data.user.email} -> ${data.user.role}`);
          setUsers(users.map(u => u._id === id ? { ...u, role: data.user.role } : u));
          return;
        } catch (e) {
          lastErr = e;
        }
      }
      throw lastErr || new Error('No se pudo actualizar el rol');
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (!user || user.role !== 'admin') {
    return <div className="container py-5"><div className="alert alert-danger">Acceso denegado</div></div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Administración de Usuarios</h2>
      <p className="text-muted">Cambia roles entre <code>user</code> y <code>admin</code>. Solo admins pueden ver esto.</p>
      {message && <div className="alert alert-success py-2">{message}</div>}
      {error && <div className="alert alert-danger py-2">{error}</div>}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-sm align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === 'admin' ? 'bg-success' : 'bg-secondary'}`}>{u.role}</span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <select
                        className="form-select form-select-sm"
                        disabled={updatingId === u._id}
                        value={u.role}
                        onChange={(e) => handleChangeRole(u._id, e.target.value)}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
