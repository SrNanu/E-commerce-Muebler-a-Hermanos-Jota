const express = require("express")
const router = express.Router()
const authGuard = require("../middlewares/authGuard")
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productos.controller")

router.get("/", authGuard, getAllProducts)
router.get("/:id", authGuard, getProductById)
router.post("/", authGuard, createProduct)
router.put("/:id", authGuard, updateProduct)
router.delete("/:id", authGuard, deleteProduct)


module.exports = router