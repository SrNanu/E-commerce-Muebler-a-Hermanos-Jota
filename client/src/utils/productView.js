export const getProductId = (product) => {
  return product?._id || product?.legacyId || product?.id || null;
};

export const getProductTitle = (product) => {
  return product?.nombre || product?.titulo || "Producto";
};

export const getProductText = (product) => {
  return product?.descripcion || product?.texto || "";
};

export const getProductImageSrc = (product) => {
  const path = product?.imagenUrl || product?.imagen || "";
  if (!path) return "";
  return path.startsWith("http") ? path : `http://localhost:4000/${path}`;
};

export const getProductPrice = (product) => {
  return product?.precio;
};