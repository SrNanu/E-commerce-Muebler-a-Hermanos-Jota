let carrito = [];

async function cargarHeaderFooter() {
    try {
        const headerResponse = await fetch('header.html');
        const headerHTML = await headerResponse.text();
        document.querySelector('header').innerHTML = headerHTML;

        const footerResponse = await fetch('footer.html');
        const footerHTML = await footerResponse.text();
        document.querySelector('footer').innerHTML = footerHTML;
        actualizarCarrito();
    } catch (error) {
        console.error("Error cargando header/footer:", error);
    }
}

function cargarCarrito() {
    try {
        const raw = localStorage.getItem('carrito');
        carrito = raw ? JSON.parse(raw) : [];
    } catch (e) {
        carrito = [];
        console.error("Error leyendo carrito:", e);
    }
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarCarrito() {
    const contador = document.querySelector('#contadorCarrito');
    if (contador) contador.textContent = carrito.length;
}

function agregarAlCarrito(id) {
    if (carrito.includes(id)) {
        if (!confirm('El producto ya está en el carrito. ¿Desea agregarlo nuevamente?')) return;
    }
    carrito.push(id);
    guardarCarrito();
    actualizarCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
    cargarHeaderFooter();
    cargarCarrito();
});