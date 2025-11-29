const adminGuard = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol admin' });
  }
  next();
};

module.exports = adminGuard;
