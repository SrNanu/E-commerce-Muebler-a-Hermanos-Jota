let carrito = [];

function cargarHeaderFooter() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => document.querySelector('header').innerHTML = data);

    fetch('footer.html')
        .then(response => response.text())
        .then(data => document.querySelector('footer').innerHTML = data);
}

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
    if (carrito.includes(id)) {
        if (!confirm('El producto ya está en el carrito. ¿Desea agregarlo nuevamente?')) return;
    }
    carrito.push(id);
    guardarCarrito();
    actualizarCarrito();
}

document.addEventListener('DOMContentLoaded', cargarCarrito);