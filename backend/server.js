const express = require('express')
const logger = require('./logger')
const cors = require("cors")
const authGuard = require('./authGuard')
const app = express()
const PORT = process.env.PORT || 4000
const products = require('./productos') 

app.use(logger)
app.use(cors())
app.use(express.json())

app.get('/api/productos', authGuard, (req, res) => {
  res.json(products)
})

app.get("/api/productos/:id", authGuard, (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(product);
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});