const tarjetas = [
    {
        imagen: "img/Aparador Uspallata.png",
        titulo: "Aparador Uspallata",
        texto: "",
        enlace: "#"
    },
    {
        imagen: "img/Biblioteca Recoleta.png",
        titulo: "Biblioteca Recoleta",
        texto: "",
        enlace: "#"
    },
    {
        imagen: "img/Butaca Mendoza.png",
        titulo: "Butaca Mendoza",
        texto: "",
        enlace: "#"
    },
    {
        imagen: "img/Sillón Copacabana.png",
        titulo: "Sillón Copacabana",
        texto: "",
        enlace: "#"
    },
    {
        imagen: "img/Mesa de Centro Araucaria.png",
        titulo: "Mesa de Centro Araucaria",
        texto: "",
        enlace: "#"
    },
    {
        imagen: "img/Mesa de Noche Aconcagua.png",
        titulo: "Mesa de Noche Aconcagua",
        texto: "",
        enlace: "#"
    },
    {
        imagen: "img/Cama Neuquén.png",
        titulo: "Cama Neuquén",
        texto: "",
        enlace: "#"
    },
    {
        imagen: "img/Sofá Patagonia.png",
        titulo: "Sofá Patagonia",
        texto: "",
        enlace: "#"
    },
    {
        imagen: "img/Mesa Comedor Pampa.png",
        titulo: "Mesa Comedor Pampa",
        texto: "",
        enlace: "#"
    },
    {
        imagen: "img/Sillas Córdoba.png",
        titulo: "Sillas Córdoba",
        texto: "",
        enlace: "#"
    },
    {
        imagen: "img/Escritorio Costa.png",
        titulo: "Escritorio Costa",
        texto: "",
        enlace: "#"
    },
    {
        imagen: "img/Silla de Trabajo Belgrano.png",
        titulo: "Silla de Trabajo Belgrano",
        texto: "",
        enlace: "#"
    }
];

function crearTarjeta(tarjeta) {
    const contenedor = document.getElementById('contenedor-tarjetas');

    tarjetas.forEach(tarjeta => {
        const card = document.createElement('div');
        card.className = 'col-md-4';

        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${tarjeta.imagen}" class="card-img-top" alt="${tarjeta.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${tarjeta.titulo}</h5>
                    <p class="card-text">${tarjeta.texto}</p>
                    <a href="${tarjeta.enlace}" class="btn btn-primary">Ver más</a>
                </div>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

crearTarjeta(tarjetas);