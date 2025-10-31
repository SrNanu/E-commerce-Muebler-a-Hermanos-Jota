const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const productosRoutes = require("./routes/productos.routes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Rutas antiguas (datos estáticos)
app.use("/api/productos", productosRoutes);
// Nuevas rutas con MongoDB
app.use("/api/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Error interno del servidor" });
});

module.exports = app;
