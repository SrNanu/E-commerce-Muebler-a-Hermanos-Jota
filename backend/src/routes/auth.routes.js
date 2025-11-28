const express = require('express');
const router = express.Router();
const authGuard = require('../middlewares/authGuard');
const { register, login, getProfile, updateUserRole } = require('../controllers/auth.controller');
const adminGuard = require('../middlewares/adminGuard');

// Rutas públicas (sin protección)
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas (requieren JWT)
router.get('/profile', authGuard, getProfile);

// Actualizar rol (solo admin)
router.get('/users', authGuard, adminGuard, async (req, res) => {
	try {
		const users = await require('../models/User').find().select('-password');
		res.json({ total: users.length, users });
	} catch (err) {
		res.status(500).json({ error: 'Error al listar usuarios' });
	}
});

router.put('/users/:id/role', authGuard, adminGuard, updateUserRole);

module.exports = router;
