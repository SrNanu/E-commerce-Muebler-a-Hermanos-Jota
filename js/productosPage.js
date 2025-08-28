const catalogo = document.querySelector("#catalogo-productos");
const inputBuscar = document.querySelector("#buscador");
const botonBuscar = document.querySelector("#boton-buscar");
let arrayProductos = [];

function simularCargaProductos() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(productos), 1000);
    });
}

function mostrarProductos(_productos) {
    catalogo.innerHTML = "";

    if (_productos.length === 0) {
        catalogo.innerHTML = `<p class="text-center mt-4">No se encontraron resultados</p>`;
        return;
    }

    _productos.forEach((producto) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mx-auto mb-4";
        tarjeta.innerHTML = `
            <div class="card shadow-sm">
                <a href="producto.html?id=${producto.id}" class="text-decoration-none text-dark">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text d-none d-md-block">${producto.texto}</p>
                    </div>
                </a>
                <div class="card-footer border-0">
                    <button class="btn w-100">Añadir al Carrito</button>
                </div>
            </div>
        `;
        const botonAgregar = tarjeta.querySelector("button");
        botonAgregar.addEventListener("click", () => agregarAlCarrito(producto.id));

        catalogo.appendChild(tarjeta);
    });
}

async function iniciarCatalogo() {
    catalogo.innerHTML = `<p class="text-center mt-4">Cargando productos...</p>`;
    arrayProductos = await simularCargaProductos();
    mostrarProductos(arrayProductos);
}

botonBuscar.addEventListener("click", (event) => {
    event.preventDefault(); 
    const texto = inputBuscar.value.toLowerCase();

    const filtrados = arrayProductos.filter(
        (p) =>
            p.titulo.toLowerCase().includes(texto) ||
            p.texto.toLowerCase().includes(texto) ||
            p.atributos.some((attr) => attr.valor.toLowerCase().includes(texto))
    );
    
    mostrarProductos(filtrados);
});

document.addEventListener("DOMContentLoaded", iniciarCatalogo);