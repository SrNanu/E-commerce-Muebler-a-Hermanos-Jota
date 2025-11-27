const express = require('express');
const router = express.Router();
const authGuard = require('../middlewares/authGuard');
const { register, login, getProfile } = require('../controllers/auth.controller');

// Rutas públicas (sin protección)
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas (requieren JWT)
router.get('/profile', authGuard, getProfile);

module.exports = router;
