
const API_PRODUCTOS_URL = `${import.meta.env.VITE_API_BASE_URL}/api/productos`;

// Obtener token del localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

/**
 * Obtiene todos los productos (público - no requiere autenticación)
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(API_PRODUCTOS_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Obtiene un producto por ID (público - no requiere autenticación)
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_PRODUCTOS_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Producto no encontrado`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * Crea un nuevo producto (requiere autenticación)
 */
export const createProduct = async (productData) => {
  try {
    const token = getAuthToken();
    const response = await fetch(API_PRODUCTOS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error ${response.status}: No se pudo crear el producto`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Actualiza un producto existente (requiere autenticación)
 */
export const updateProduct = async (id, productData) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_PRODUCTOS_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error ${response.status}: No se pudo actualizar el producto`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Elimina un producto (requiere autenticación)
 */
export const deleteProduct = async (id) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_PRODUCTOS_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error ${response.status}: No se pudo eliminar el producto`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const getMisPedidos = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/mis-pedidos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error ${response.status}: No se pudo obtener los pedidos`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};