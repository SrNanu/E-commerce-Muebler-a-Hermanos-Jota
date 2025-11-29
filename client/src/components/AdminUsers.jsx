import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const AdminUsers = () => {
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState(null);

  // 📌 Busqueda y filtro por roles
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
    const matchSearch =
      u.nombre.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter ? u.role === roleFilter : true;
    return matchSearch && matchRole;
  });

  if (!user || user.role !== "admin")
    return <div className="container py-5"><div className="alert alert-danger">Acceso denegado</div></div>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">Administración de Usuarios</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex gap-3 mb-3 align-items-center flex-wrap">

        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          className="form-control w-auto"
          style={{ minWidth: "260px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className={`btn ${roleFilter===null?"btn-dark": "btn-outline-dark"}`}
          onClick={() => setRoleFilter(null)}
        >Todos</button>

        <button
          className={`btn ${roleFilter==="user"?"btn-primary": "btn-outline-primary"}`}
          onClick={() => setRoleFilter("user")}
        >User</button>

        <button
          className={`btn ${roleFilter==="admin"?"btn-warning": "btn-outline-warning"}`}
          onClick={() => setRoleFilter("admin")}
        >Admin</button>

      </div>

      {loading && <div>Cargando usuarios...</div>}
      <table className="table table-modern text-center align-middle">
        <thead>
          <tr>
            <th>Nombre</th><th>Email</th><th>Rol</th><th>Acción</th>
          </tr>
        </thead>

        <tbody>
        {filtered.length > 0 ? (
          filtered.map(u => (
            <tr key={u._id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <span className={`role-badge ${u.role==="admin"?"role-admin":"role-user"}`}>
                  {u.role}
                </span>
              </td>
              <td>
                <select
                  value={u.role}
                  onChange={(e)=>handleChangeRole(u._id,e.target.value)}
                  disabled={updatingId===u._id}
                  className="form-select w-auto mx-auto"
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))
        ):(
          <tr><td colSpan="4" className="text-muted">No se encontraron usuarios.</td></tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
