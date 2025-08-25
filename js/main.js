// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
});

// Función para obtener el carrito desde localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Función para guardar el carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para actualizar el contador del ícono del carrito en el header
function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const contador = document.getElementById('cart-counter');
    if (contador) {
        // Sumamos las cantidades de todos los productos en el carrito
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = totalItems;
    }
}