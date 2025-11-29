const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  legacyId: {
    type: Number,
    index: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio']
  },
  descripcion: {
    type: String
  },
  precio: {
    type: Number,
    required: [true, 'El precio del producto es obligatorio']
  },
  stock: {
    type: Number,
    default: 0
  },
  imagenUrl: {
    type: String
  },
  destacado: {
    type: Boolean,
    default: false
  },
  atributos: {
    type: Array,
    default: []
  },
  categoria: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', productSchema)
