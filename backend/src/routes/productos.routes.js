const express = require("express")
const router = express.Router()
const authGuard = require("../middlewares/authGuard")
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productos.controller")

// Rutas públicas (solo lectura)
router.get("/", getAllProducts)
router.get("/:id", getProductById)

// Rutas protegidas (solo administradores)
router.post("/", authGuard, createProduct)
router.put("/:id", authGuard, updateProduct)
router.delete("/:id", authGuard, deleteProduct)


module.exports = router