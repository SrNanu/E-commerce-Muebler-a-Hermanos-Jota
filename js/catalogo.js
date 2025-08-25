// js/catalogo.js

document.addEventListener('DOMContentLoaded', () => {
    const productosDestacadosContainer = document.getElementById('productos-destacados-container');
    const catalogoContainer = document.getElementById('catalogo-container');
    const searchInput = document.getElementById('search-input');

    // Simular carga asíncrona de datos
    const cargarProductos = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(productos); // 'productos' viene de data.js
            }, 1000); // Simula 1 segundo de carga
        });
    };

    // Función para renderizar tarjetas de producto
    const renderizarProductos = (listaProductos, container) => {
        container.innerHTML = ''; // Limpiar contenedor
        if (listaProductos.length === 0) {
            container.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }
        listaProductos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)}</p>
                <a href="producto.html?id=${producto.id}" class="btn">Ver Detalle</a>
            `;
            container.appendChild(card);
        });
    };

    // Lógica para la página de inicio (index.html)
    if (productosDestacadosContainer) {
        cargarProductos().then(todosLosProductos => {
            const destacados = todosLosProductos.filter(p => p.destacado);
            renderizarProductos(destacados, productosDestacadosContainer);
        });
    }

    // Lógica para la página de catálogo (productos.html)
    if (catalogoContainer) {
        cargarProductos().then(todosLosProductos => {
            renderizarProductos(todosLosProductos, catalogoContainer);

            // Funcionalidad de búsqueda
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const terminoBusqueda = e.target.value.toLowerCase();
                    const productosFiltrados = todosLosProductos.filter(p =>
                        p.nombre.toLowerCase().includes(terminoBusqueda)
                    );
                    renderizarProductos(productosFiltrados, catalogoContainer);
                });
            }
        });
    }
});