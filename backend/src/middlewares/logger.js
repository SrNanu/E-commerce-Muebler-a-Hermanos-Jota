const logger = (req, res, next) => {
    console.log(`Metodo: ${req.method} URL: ${req.url}`);
    next();
}

module.exports = logger