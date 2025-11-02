import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../utils/productApi';

const AdminCreateProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    imagenUrl: '',
    atributos: []
  });
  const [atributoTemp, setAtributoTemp] = useState({ nombre: '', valor: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!form.nombre.trim()) {
        throw new Error('El nombre del producto es obligatorio');
      }
      if (!form.descripcion.trim()) {
        throw new Error('La descripción del producto es obligatoria');
      }
      if (!form.precio || parseFloat(form.precio) <= 0) {
        throw new Error('El precio debe ser un número mayor a 0');
      }

      const productData = {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio: parseFloat(form.precio),
        stock: form.stock ? parseInt(form.stock) : 0,
        categoria: form.categoria.trim() || 'Sin categoría',
        imagenUrl: form.imagenUrl.trim(),
        atributos: form.atributos
      };

      await createProduct(productData);
      
      setSuccess(true);
      
      setForm({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: '',
        imagenUrl: '',
        atributos: []
      });

      setTimeout(() => {
        navigate('/admin/productos');
      }, 1500);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Crear Nuevo Producto</h2>
      
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          ✓ Producto creado exitosamente. Redirigiendo...
          <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Nombre *</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Ej: Silla de madera"
                value={form.nombre}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Descripción *</label>
              <textarea
                name="descripcion"
                className="form-control"
                rows={4}
                placeholder="Descripción detallada del producto..."
                value={form.descripcion}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Precio (ARS) *</label>
                <input
                  type="number"
                  name="precio"
                  className="form-control"
                  placeholder="0.00"
                  step="0.01"
                  value={form.precio}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Stock</label>
                <input
                  type="number"
                  name="stock"
                  className="form-control"
                  placeholder="0"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Categoría</label>
                <input
                  type="text"
                  name="categoria"
                  className="form-control"
                  placeholder="Ej: Sillas, Mesas, Camas"
                  value={form.categoria}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">URL de imagen</label>
                <input
                  type="text"
                  name="imagenUrl"
                  className="form-control"
                  placeholder="img/productos/ejemplo.jpg"
                  value={form.imagenUrl}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Atributos</label>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del atributo"
                  value={atributoTemp.nombre}
                  onChange={(e) => setAtributoTemp(prev => ({...prev, nombre: e.target.value}))}
                  disabled={loading}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Valor del atributo"
                  value={atributoTemp.valor}
                  onChange={(e) => setAtributoTemp(prev => ({...prev, valor: e.target.value}))}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleAtributoAdd}
                  disabled={loading}
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
              <button 
                type="submit" 
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? 'Creando...' : '✓ Crear Producto'}
              </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => setForm({
                  nombre: '',
                  descripcion: '',
                  precio: '',
                  stock: '',
                  categoria: '',
                  imagenUrl: '',
                  atributos: []
                })}
                disabled={loading}
              >
                Limpiar
              </button>
              <button 
                type="button" 
                className="btn btn-outline-dark"
                onClick={() => navigate('/admin/productos')}
                disabled={loading}
              >
                ← Volver
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateProduct;