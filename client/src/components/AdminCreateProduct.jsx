import React, { useState } from 'react';

const AdminCreateProduct = () => {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: 0,
    imagenUrl: '',
    atributos: [],
    categoria: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [atributoTemp, setAtributoTemp] = useState({ nombre: '', valor: '' });

  const handleAtributoAdd = () => {
    if (atributoTemp.nombre.trim() && atributoTemp.valor.trim()) {
      setForm((prev) => ({
        ...prev,
        atributos: [...prev.atributos, { 
          nombre: atributoTemp.nombre.trim(), 
          valor: atributoTemp.valor.trim() 
        }]
      }));
      setAtributoTemp({ nombre: '', valor: '' });
    }
  };

  const handleAtributoRemove = (index) => {
    setForm((prev) => ({
      ...prev,
      atributos: prev.atributos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "muebles123"
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al crear el producto');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Producto creado:', data);
        alert('Producto creado exitosamente.');
        setForm({
          nombre: '',
          descripcion: '',
          precio: '',
          stock: 0,
          imagenUrl: '',
          atributos: [],
          categoria: ''
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error al crear el producto.');
      });
  };

  return (
    <div className="container">
      <h2 className="mb-4">Administración: Crear Producto</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre*</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                name="descripcion"
                className="form-control"
                rows={3}
                value={form.descripcion}
                onChange={handleChange}
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Precio*</label>
                <input
                  type="number"
                  name="precio"
                  className="form-control"
                  value={form.precio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  name="stock"
                  className="form-control"
                  value={form.stock}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <input
                type="text"
                name="categoria"
                className="form-control"
                value={form.categoria}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">URL de imagen</label>
              <input
                type="text"
                name="imagenUrl"
                className="form-control"
                value={form.imagenUrl}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Atributos</label>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del atributo"
                  value={atributoTemp.nombre}
                  onChange={(e) => setAtributoTemp(prev => ({...prev, nombre: e.target.value}))}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Valor del atributo"
                  value={atributoTemp.valor}
                  onChange={(e) => setAtributoTemp(prev => ({...prev, valor: e.target.value}))}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleAtributoAdd}
                >
                  Agregar
                </button>
              </div>
              {form.atributos.length > 0 && (
                <div className="mt-2">
                  {form.atributos.map((attr, index) => (
                    <span
                      key={index}
                      className="badge bg-secondary me-2 mb-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleAtributoRemove(index)}
                    >
                      {attr.nombre}: {attr.valor} ×
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-primary">Crear</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setForm({
                  nombre: '',
                  descripcion: '',
                  precio: '',
                  stock: 0,
                  imagenUrl: '',
                  atributos: [],
                  categoria: ''
                })}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateProduct;