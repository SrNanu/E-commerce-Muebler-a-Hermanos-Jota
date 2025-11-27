const express = require("express")
const cors = require("cors")
const path = require("path")
const logger = require("./middlewares/logger")
const productosRoutes = require("./routes/productos.routes")
const authRoutes = require("./routes/auth.routes")
const ordersRoutes = require("./routes/orders.routes")

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')))

app.use("/api/productos", productosRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/orders", ordersRoutes)

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" })
})

app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`)
  const status = err.status || 500
  res.status(status).json({ error: err.message || "Error interno del servidor" })
})

module.exports = app
