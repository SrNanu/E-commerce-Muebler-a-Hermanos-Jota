const catalogo = document.getElementById('catalogo-productos');
const inputBuscar = document.querySelector('input[type="search"]');

function mostrarProductos(_productos) {
    catalogo.innerHTML = "";

    _productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mx-auto mb-4';

        card.innerHTML = `
            <div class="card border-0 shadow-sm">
                <a href="producto.html?id=${producto.id}" class="text-decoration-none text-dark">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text d-none d-md-block">${producto.texto}</p>
                        
                    </div>
                </a>
                <div class="card-footer bg-white border-0">
                    <button class="btn btn-outline-primary w-100" onclick="agregarAlCarrito(${producto.id})">Añadir al Carrito</button>
                </div>
            </div>
        `;
        catalogo.appendChild(card);
    });

    if (_productos.length === 0) {
        catalogo.innerHTML = `<p class="text-center mt-4">No se encontraron resultados</p>`;
    }
}

mostrarProductos(productos);

inputBuscar.addEventListener("input", () => {
    const texto = inputBuscar.value.toLowerCase();
    const filtrados = productos.filter(p => 
        p.titulo.toLowerCase().includes(texto) || 
        p.texto.toLowerCase().includes(texto) ||
        p.atributos.some(attr => attr.valor.toLowerCase().includes(texto))
    );
    mostrarProductos(filtrados);
});
