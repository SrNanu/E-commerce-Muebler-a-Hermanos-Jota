const productosDestacados = [
    {
        nombre: "Aparador Uspallata",
        imagen: "img/productos/Aparador Uspallata.png"
    },
    {
        nombre: "Butaca Mendoza",
        imagen: "img/productos/Butaca Mendoza.png"
    },
    {
        nombre: "Sofá Patagonia",
        imagen: "img/productos/Sofá Patagonia.png"
    }
];

function mostrarDestacados() {
    const contenedor = document.getElementById('destacados-lista');
    if (!contenedor) return;

    contenedor.innerHTML = productosDestacados.map(producto => {
        // Coincidencia exacta con el campo titulo
        const productoCompleto = window.productos?.find(p => p.titulo.trim() === producto.nombre.trim());
        const id = productoCompleto ? productoCompleto.id : '';
        return `
        <div class="col-md-4 mb-3">
            <a href="producto.html?id=${id}" style="text-decoration:none;color:inherit;">
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                    </div>
                </div>
            </a>
        </div>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', mostrarDestacados);