const express = require('express');
const router = express.Router();
const authGuard = require('../middlewares/authGuard');
const { 
  createOrder, 
  getUserOrders, 
  getOrderById,
  getAllOrders,
  updateOrderStatus 
} = require('../controllers/orders.controller');

// Todas las rutas de pedidos requieren autenticación
router.post('/', authGuard, createOrder);
router.get('/mis-pedidos', authGuard, getUserOrders);
router.get('/mis-pedidos/:id', authGuard, getOrderById);

// Rutas de administración (requieren role admin)
router.get('/admin/all', authGuard, getAllOrders);
router.patch('/admin/:id/status', authGuard, updateOrderStatus);

module.exports = router;
