import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UserCard from "./UserCard";
import "../styles/ProductList.css";
import "../styles/ProductCard.css";

const AdminUsers = () => {
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState(null);

  // 📌 Busqueda y filtro por roles
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState(null); // user | admin | null

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const bases = [
      import.meta.env.VITE_API_BASE_URL,
      "http://localhost:4000",
    ].filter(Boolean);

    try {
      for (const base of bases) {
        const res = await fetch(`${base}/api/auth/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          return setLoading(false);
        }
      }
      throw new Error("No se pudo conectar al servidor");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChangeRole = async (id, newRole) => {
    setUpdatingId(id);
    setMessage(null);

    const bases = [
      import.meta.env.VITE_API_BASE_URL,
      "http://localhost:4000",
    ].filter(Boolean);

    try {
      for (const base of bases) {
        const res = await fetch(`${base}/api/auth/users/${id}/role`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: newRole }),
        });
        const data = await res.json();

        if (res.ok) {
          setMessage(`Rol actualizado: ${data.user.email} → ${data.user.role}`);
          setUsers(users.map(u => u._id === id ? {...u, role: data.user.role} : u));
          return setUpdatingId(null);
        }
      }
      throw new Error("No se pudo actualizar");
    } catch (err) {
      setError(err.message);
      setUpdatingId(null);
    }
  };

  // FILTRADO DINÁMICO 
  const filtered = users.filter(u => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      (u.nombre || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q);

    const matchRole = roleFilter ? u.role === roleFilter : true;
    return matchSearch && matchRole;
  });

  if (!user || user.role !== "admin") {
    return (
      <div className="product-list-container">
        <div className="no-results">
          <div className="no-results-icon">⛔</div>
          <h2 className="no-results-title">Acceso denegado</h2>
          <p className="no-results-text">Debes ser administrador para ver esta sección.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="product-list-title">Gestión de Usuarios</h1>
        <p className="product-list-subtitle">Administrador de usuarios</p>
      </div>

      {message && (
        <div className="product-list-content" style={{ paddingTop: 0 }}>
          <div className="no-results" style={{ paddingTop: 0 }}>
            <div className="no-results-icon">✅</div>
            <h2 className="no-results-title">{message}</h2>
          </div>
        </div>
      )}

      {error && (
        <div className="product-list-content" style={{ paddingTop: 0 }}>
          <div className="no-results" style={{ paddingTop: 0 }}>
            <div className="no-results-icon">⚠️</div>
            <h2 className="no-results-title">{error}</h2>
          </div>
        </div>
      )}

      <div className="product-list-content">
        <div className="product-list-filters">
          <div className="filters-row">
            <div className="filter-group">
              <label className="filter-label">Buscar</label>
              <input
                type="text"
                className="filter-input"
                placeholder="Buscar por nombre o email..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); setSearch(searchInput); }
                }}
              />
            </div>

            <div className="filter-group" style={{ maxWidth: '220px' }}>
              <label className="filter-label">Rol</label>
              <select
                className="filter-select"
                value={roleFilter ?? ''}
                onChange={(e) => setRoleFilter(e.target.value || null)}
              >
                <option value="">Todos</option>
                <option value="user">Usuario</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button className="filter-btn" onClick={() => setSearch(searchInput)}>
              <i className="bi bi-search"></i>
              Buscar
            </button>

            {(search || roleFilter) && (
              <button className="filter-btn filter-btn-clear" onClick={() => { setSearchInput(''); setSearch(''); setRoleFilter(null); }}>
                <i className="bi bi-x-circle"></i>
                Limpiar
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
            <div className="product-list-results">
              <span className="results-count">
                Mostrando <strong>{filtered.length}</strong> de <strong>{users.length}</strong> usuarios
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h2 className="no-results-title">No se encontraron usuarios</h2>
                <p className="no-results-text">Ajusta los filtros o la búsqueda</p>
                <button className="no-results-btn" onClick={() => { setSearchInput(''); setSearch(''); setRoleFilter(null); }}>
                  <i className="bi bi-arrow-counterclockwise"></i>
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="list-container">
                {filtered.map(u => (
                  <div className="list-row" key={u._id}>
                    <div>
                      <div className="list-title">{u.nombre || 'Sin nombre'}</div>
                      <div className="list-subtitle">{u.email}</div>
                    </div>
                    <div className="list-meta">{u.role === 'admin' ? 'Administrador' : 'Usuario'}</div>
                    <div>
                      <select
                        className="filter-select list-select"
                        value={u.role}
                        onChange={(e) => handleChangeRole(u._id, e.target.value)}
                        disabled={updatingId === u._id}
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="list-actions">
                      {/* espacio para acciones futuras */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
