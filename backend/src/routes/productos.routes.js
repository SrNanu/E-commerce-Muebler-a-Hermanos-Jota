const express = require("express")
const router = express.Router()
const authGuard = require("../middlewares/authGuard")
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getFeaturedProducts } = require("../controllers/productos.controller")
const adminGuard = require('../middlewares/adminGuard')

// Rutas públicas (solo lectura)
router.get("/", getAllProducts)
router.get("/destacados", getFeaturedProducts)
router.get("/:id", getProductById)

// Rutas protegidas (solo administradores) - verificación de rol dentro de controller o middleware
router.post("/", authGuard, adminGuard, createProduct)
router.put("/:id", authGuard, adminGuard, updateProduct)
router.delete("/:id", authGuard, adminGuard, deleteProduct)


module.exports = router
