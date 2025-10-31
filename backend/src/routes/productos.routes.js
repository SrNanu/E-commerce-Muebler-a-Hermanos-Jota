const express = require("express");
const router = express.Router();
const authGuard = require("../middlewares/authGuard");
const { getAllProducts, getProductById, createProduct } = require("../controllers/productos.controller");

router.get("/", authGuard, getAllProducts);
router.get("/:id", authGuard, getProductById);
router.post("/", authGuard, createProduct);

module.exports = router;