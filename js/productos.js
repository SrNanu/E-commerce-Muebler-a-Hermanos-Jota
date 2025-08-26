const tarjetas = [
    {
        imagen: "../img/Aparador Uspallata.png",
        titulo: "Aparador Uspallata",
        texto: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        enlace: "#"
    },
    {
        imagen: "../img/Biblioteca Recoleta.png",
        titulo: "Biblioteca Recoleta",
        texto: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
        enlace: "#"
    },
    {
        imagen: "../img/Butaca Mendoza.png",
        titulo: "Butaca Mendoza",
        texto: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
        enlace: "#"
    },
    {
        imagen: "../img/Sillón Copacabana.png",
        titulo: "Sillón Copacabana",
        texto: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
        enlace: "#"
    },
    {
        imagen: "../img/Mesa de Centro Araucaria.png",
        titulo: "Mesa de Centro Araucaria",
        texto: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
        enlace: "#"
    },
    {
        imagen: "../img/Mesa de Noche Aconcagua.png",
        titulo: "Mesa de Noche Aconcagua",
        texto: "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
        enlace: "#"
    },
    {
        imagen: "../img/Cama Neuquén.png",
        titulo: "Cama Neuquén",
        texto: "Cama plataforma con cabecero flotante tapizado en lino natural y estructura de madera maciza. Su diseño minimalista y sofisticado crea un ambiente de serenidad y elegancia, perfecto para dormitorios contemporáneos que buscan paz y simplicidad.",
        enlace: "#"
    },
    {
        imagen: "../img/Sofá Patagonia.png",
        titulo: "Sofá Patagonia",
        texto: "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.",
        enlace: "#"
    },
    {
        imagen: "../img/Mesa Comedor Pampa.png",
        titulo: "Mesa Comedor Pampa",
        texto: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
        enlace: "#"
    },
    {
        imagen: "../img/Sillas Córdoba.png",
        titulo: "Sillas Córdoba",
        texto: "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
        enlace: "#"
    },
    {
        imagen: "../img/Escritorio Costa.png",
        titulo: "Escritorio Costa",
        texto: "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
        enlace: "#"
    },
    {
        imagen: "../img/Silla de Trabajo Belgrano.png",
        titulo: "Silla de Trabajo Belgrano",
        texto: "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
        enlace: "#"
    }
];

function crearTarjeta(tarjeta) {
    const contenedor = document.getElementById('contenedor-tarjetas');

    tarjetas.forEach(tarjeta => {
        const card = document.createElement('div');
        card.className = 'col-md-4 col-sm-6 col-6 mx-auto';
        card.innerHTML = `
            <div class="card border-0">
                <img src="${tarjeta.imagen}" class="card-img-top" alt="${tarjeta.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${tarjeta.titulo}</h5>
                    <p class="card-text d-none d-md-block">${tarjeta.texto}</p>
                    <a href="${tarjeta.enlace}" class="btn btn-primary">Ver más</a>
                </div>
            </div>
        `;

        contenedor.appendChild(card);
    });
}


crearTarjeta(tarjetas);


const contenedor = document.getElementById('contenedor-tarjetas');
const inputBuscar = document.querySelector('input[type="search"]');

function mostrarTarjetas(lista) {
    contenedor.innerHTML = "";

    lista.forEach(tarjeta => {
        const card = document.createElement('div');
        card.className = 'col-md-4 col-sm-6 col-6 mx-auto';
        card.innerHTML = `
            <div class="card border-0 shadow-sm">
                <img src="${tarjeta.imagen}" class="card-img-top" alt="${tarjeta.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${tarjeta.titulo}</h5>
                    <p class="card-text d-none d-md-block">${tarjeta.texto}</p>
                    <a href="${tarjeta.enlace}" class="btn btn-dark">Ver más</a>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });

    if (lista.length === 0) {
        contenedor.innerHTML = `<p class="text-center mt-4">No se encontraron resultados</p>`;
    }
}

mostrarTarjetas(tarjetas);

inputBuscar.addEventListener("input", () => {
    const texto = inputBuscar.value.toLowerCase();
    const filtradas = tarjetas.filter(t => 
        t.titulo.toLowerCase().includes(texto) || 
        t.texto.toLowerCase().includes(texto)
    );
    mostrarTarjetas(filtradas);
});