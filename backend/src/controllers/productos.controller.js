const productos = require("../data/productos");

const getAllProducts = (req, res) => {
  res.json(productos);
};

const getProductById = (req, res) => {
  const product = productos.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(product);
};

module.exports = { getAllProducts, getProductById };
