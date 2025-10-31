const Product = require("../models/Product")

const getAllProducts = async (req, res) => {
  try {
    const productos = await Product.find().lean()
    res.json(productos)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    let producto = null
    // Si es un ObjectId válido, buscar por _id
    if (/^[a-f\d]{24}$/i.test(id)) {
      producto = await Product.findById(id).lean()
    } else {
      // Si es numérico, buscar por legacyId
      const legacyId = parseInt(id, 10)
      if (!Number.isNaN(legacyId)) {
        producto = await Product.findOne({ legacyId }).lean()
      }
    }

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json(producto)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.status(201).json(savedProduct)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true }).lean()
    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json(updatedProduct)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id).lean()
    if (!deletedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json({ message: "Producto eliminado" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct }
