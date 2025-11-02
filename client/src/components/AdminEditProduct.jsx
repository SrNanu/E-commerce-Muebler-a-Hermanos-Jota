import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../utils/productApi';

const AdminEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    imagenUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Cargar producto al montar el componente
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const product = await getProductById(id);
        
        setForm({
          nombre: product.nombre || '',
          descripcion: product.descripcion || '',
          precio: product.precio || '',
          stock: product.stock || '',
          categoria: product.categoria || '',
          imagenUrl: product.imagenUrl || ''
        });
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err.message || 'Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Validar campos requeridos
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
        imagenUrl: form.imagenUrl.trim()
      };

      const data = await updateProduct(id, productData);
      
      setSuccess(true);
      console.log('Producto actualizado:', data);

      // Redirigir tras 1.5 segundos
      setTimeout(() => {
        navigate('/admin/productos');
      }, 1500);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Error al actualizar el producto');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando producto...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <button 
          className="btn btn-link text-dark p-0 me-2"
          onClick={() => navigate('/admin/productos')}
          title="Volver"
        >
          ← 
        </button>
        <h2 className="mb-0">Editar Producto</h2>
      </div>
      
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          ✓ Producto actualizado exitosamente. Redirigiendo...
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
                disabled={saving}
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
                disabled={saving}
                required
              />
            </div>

            <div className="row g-3">
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
                  disabled={saving}
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
                  disabled={saving}
                />
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Categoría</label>
                <input
                  type="text"
                  name="categoria"
                  className="form-control"
                  placeholder="Ej: Sillas, Mesas, Camas"
                  value={form.categoria}
                  onChange={handleChange}
                  disabled={saving}
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
                  disabled={saving}
                />
              </div>
            </div>

            <div className="mt-4 d-flex gap-2">
              <button 
                type="submit" 
                className="btn btn-success"
                disabled={saving}
              >
                {saving ? 'Guardando...' : '✓ Guardar Cambios'}
              </button>
              <button 
                type="button" 
                className="btn btn-outline-dark"
                onClick={() => navigate('/admin/productos')}
                disabled={saving}
              >
                ← Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
