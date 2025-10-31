import React, { useState } from 'react';

// Vista sencilla para crear productos (placeholder). En el futuro puede integrarse con el backend.
const AdminCreateProduct = () => {
  const [form, setForm] = useState({
    titulo: '',
    texto: '',
    precio: '',
    imagen: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías hacer un fetch POST al backend: /api/productos
    console.log('Crear producto (demo):', form);
    alert('Producto preparado para crear (demo). Integra el POST al backend cuando esté listo.');
  };

  return (
    <div className="container">
      <h2 className="mb-4">Administración: Crear Producto</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                name="titulo"
                className="form-control"
                value={form.titulo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                name="texto"
                className="form-control"
                rows={3}
                value={form.texto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Precio (opcional)</label>
                <input
                  type="number"
                  name="precio"
                  className="form-control"
                  value={form.precio}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">URL de imagen</label>
                <input
                  type="text"
                  name="imagen"
                  className="form-control"
                  value={form.imagen}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-primary">Crear</button>
              <button type="reset" className="btn btn-secondary" onClick={() => setForm({ titulo: '', texto: '', precio: '', imagen: '' })}>Limpiar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateProduct;
