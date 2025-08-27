document.addEventListener('DOMContentLoaded', () => {
    function getQueryParam(parametro) {
        const params = new URLSearchParams(window.location.search);
        return params.get(parametro);
    }

    const id = parseInt(getQueryParam('id'), 10);
    const cont = document.getElementById('productoDetalle');

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        cont.innerHTML = '<div class="alert alert-danger">Producto no encontrado.</div>';
        return;
    }

    let atributosHTML = '';
    producto.atributos.forEach(attr => {
        atributosHTML += `<li class="list-group-item"><strong>${attr.nombre}:</strong> ${attr.valor}</li>`;
    });

    cont.innerHTML = `
        <div class="row g-0">
            <div class="col-md-6">
                <img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.titulo}">
            </div>
            <div class="col-md-6 d-flex flex-column justify-content-center">
                <div class="card-body">
                    <h3 class="card-title">${producto.titulo}</h3>
                    <p class="card-text">${producto.texto}</p>

                    <h5 class="mt-4">Especificaciones</h5>
                    <ul class="list-group list-group-flush">
                        ${atributosHTML}
                    </ul>

                    <button class="btn btn-primary w-100 mt-4" onclick="agregarAlCarrito(${producto.id})">Añadir al Carrito</button>
                </div>
            </div>
        </div>
    `;
});
