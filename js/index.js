function mostrarDestacados() {
    const contenedor = document.getElementById("destacados-lista");
    if (!contenedor || !window.productos) return;

    contenedor.innerHTML = "";

    const destacados = window.productos.filter(p => p.destacado);

    destacados.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "col-md-4 mb-3";

        tarjeta.innerHTML = `
            <div class="card shadow-sm">
                <a href="producto.html?id=${producto.id}" class="text-decoration-none text-dark">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                    <div class="card-body">
                        <h5 class="card-title text-center">${producto.titulo}</h5>
                    </div>
                </a>
                <div class="card-footer border-0">
                    <button class="btn w-100">Añadir al Carrito</button>
                </div>
            </div>
        `;
        const botonAgregar = tarjeta.querySelector("button");
        botonAgregar.addEventListener("click", () => agregarAlCarrito(producto.id));

        contenedor.appendChild(tarjeta);
    });
}

document.addEventListener("DOMContentLoaded", mostrarDestacados);