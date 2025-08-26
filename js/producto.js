document.addEventListener('DOMContentLoaded', () => {
    function getQueryParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    const id = parseInt(getQueryParam('id'), 10);
    const cont = document.getElementById('productoDetalle');

    const prod = productos.find(p => p.id === id);

    if (!prod) {
        cont.innerHTML = '<div class="alert alert-danger">Producto no encontrado.</div>';
        return;
    }

    // Generar HTML de atributos dinámicamente
    let atributosHTML = '';
    prod.atributos.forEach(attr => {
        atributosHTML += `<li class="list-group-item"><strong>${attr.nombre}:</strong> ${attr.valor}</li>`;
    });

    cont.innerHTML = `
        <div class="row g-0">
            <div class="col-md-6">
                <img src="${prod.imagen}" class="img-fluid rounded-start" alt="${prod.titulo}">
            </div>
            <div class="col-md-6 d-flex flex-column justify-content-center">
                <div class="card-body">
                    <h3 class="card-title">${prod.titulo}</h3>
                    <p class="card-text">${prod.texto}</p>

                    <h5 class="mt-4">Especificaciones</h5>
                    <ul class="list-group list-group-flush">
                        ${atributosHTML}
                    </ul>

                    <button class="btn btn-primary w-100 mt-4" onclick="agregarAlCarrito(${prod.id})">Añadir al Carrito</button>
                </div>
            </div>
        </div>
    `;
});
