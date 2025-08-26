let carrito = [];

function cargarCarrito() {
    try {
        const raw = localStorage.getItem('carrito');
        carrito = raw ? JSON.parse(raw) : [];
    } catch (e) {
        carrito = [];
    }
    actualizarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarCarrito() {
    const el = document.getElementById('contadorCarrito');
    if (el) el.textContent = carrito.length;
}

function agregarAlCarrito(id) {
    carrito.push(id);
    guardarCarrito();
    actualizarCarrito();
}

document.addEventListener('DOMContentLoaded', cargarCarrito);