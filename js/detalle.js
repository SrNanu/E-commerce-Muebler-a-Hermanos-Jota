// js/detalle.js

document.addEventListener('DOMContentLoaded', () => {
    const productoDetalleContainer = document.getElementById('producto-detalle-container');
    
    // Obtener el ID del producto de la URL
    const params = new URLSearchParams(window.location.search);
    const productoId = parseInt(params.get('id'));

    // Encontrar el producto en nuestra base de datos
    const producto = productos.find(p => p.id === productoId);

    if (producto && productoDetalleContainer) {
        productoDetalleContainer.innerHTML = `
            <div class="producto-detalle-img">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="producto-detalle-info">
                <h2>${producto.nombre}</h2>
                <p class="precio">$${producto.precio.toFixed(2)}</p>
                <p class="descripcion">${producto.descripcion}</p>
                <button id="add-to-cart-btn" class="btn">Añadir al Carrito</button>
            </div>
        `;

        // Lógica para añadir al carrito
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => {
            agregarAlCarrito(producto);
        });
    } else if (productoDetalleContainer) {
        productoDetalleContainer.innerHTML = '<p>Producto no encontrado.</p>';
    }
});

function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito(); // Función de main.js
    
    const productoEnCarrito = carrito.find(item => item.id === producto.id);

    if (productoEnCarrito) {
        // Si el producto ya está, incrementamos la cantidad
        productoEnCarrito.cantidad++;
    } else {
        // Si no está, lo agregamos con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito); // Función de main.js
    actualizarContadorCarrito(); // Función de main.js
    
    // Feedback al usuario
    alert(`${producto.nombre} ha sido añadido al carrito.`);
}