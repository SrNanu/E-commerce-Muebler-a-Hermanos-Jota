const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const productosRoutes = require("./routes/productos.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/productos", productosRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = app;
