const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const products = require('./productos') 

app.use(express.json())

app.get('/api/productos', (req, res) => {
  res.json(products)
})

app.get("/api/productos/:id", (req, res) => {
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