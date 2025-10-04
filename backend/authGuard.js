const authGuard = (req, res, next) => {
    const passwordAdmin = 'muebles123';

    const tokenRecibido = req.headers['authorization'];

    if (tokenRecibido !== passwordAdmin) {
        return res.status(401).json({ error: 'Acceso no autorizado.' });
    }

    next();
};

module.exports = authGuard;