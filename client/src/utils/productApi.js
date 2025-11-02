const API_BASE_URL = 'https://e-commerce-muebler-a-hermanos-jota.onrender.com/api/productos';
const AUTH_HEADER = 'muebles123';

/**
 * Obtiene todos los productos
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_HEADER
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
 * Obtiene un producto por ID
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_HEADER
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
 * Crea un nuevo producto
 */
export const createProduct = async (productData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_HEADER
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
 * Actualiza un producto existente
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_HEADER
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
 * Elimina un producto
 */
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_HEADER
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
