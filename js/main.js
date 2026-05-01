//-- Array de imágenes --//
 
imagenesViajes = [
    {
        id: 1,
        src: '/assets/images/viajes/viajes-1.jpg',
        title: 'Mujer en la playa',
        alt: 'foto de una mujer en hamaca en la playa',
        tags: ['playa', 'arena', 'palmera', 'mar']
    },
    {
        id: 2,
        src: '/assets/images/viajes/viajes-2.jpg',
        title: 'Un muelle en el mar',
        alt: 'foto de un muelle en el mar',
        tags: ['playa', 'cielo', 'mar', 'muelle']
    },
    {
        id: 3,
        src: '/assets/images/viajes/viajes-3.jpg',
        title: 'Cartel con destinos',
        alt: 'foto de un poste con un carteles con nombres de ciudades',
        tags: ['cielo', 'ciudad']
    },
    {
        id: 4,
        src: '/assets/images/viajes/viajes-4.jpg',
        title: 'Plaza España en Sevilla',
        alt: 'foto de la Plaza españa con una porcion del puente',
        tags: ['plaza', 'monumento', 'ciudad']
    },
    {
        id: 5,
        src: '/assets/images/viajes/viajes-5.jpg',
        title: 'Plaza España en Sevilla 2',
        alt: 'foto de la Plaza españa con una porcion del puente',
        tags: ['puente', 'monumento', 'farola', 'plaza', 'ciudad']
    },
    {
        id: 6,
        src: '/assets/images/viajes/viajes-6.jpg',
        title: 'Camino al tunel por la orilla',
        alt: 'foto de un camino costero que atraviesa un tunel',
        tags: ['playa', 'tunel', 'mar']
    },
    {
        id: 7,
        src: '/assets/images/viajes/viajes-7.jpg',
        title: 'Un castillo en las alturas',
        alt: 'foto de un pueblo con casas blancas. Al fondo se ve un castillo.',
        tags: ['castillo', 'casas', 'montaña', 'campo']
    },
]
 
// Obtener referencias a los contenedores del HTML
const contenedorFiltros = document.getElementById('controles-filtro');
const textoFiltro = document.getElementById('texto-filtro');
const contenedorGaleria = document.getElementById('galeria-contenedor');
 
// Recolectar todos los tags únicos de las fotos
const miListaDeTags = ['todos'];
imagenesViajes.forEach(foto => {
    foto.tags.forEach(tag => {
        if (!miListaDeTags.includes(tag)) {
            miListaDeTags.push(tag);
        }
    });
});
 
// Función para crear los botones de filtro
const crearBotones = () => {
    miListaDeTags.forEach(tag => {
        const boton = document.createElement('button');
        boton.textContent = tag.toUpperCase();
        boton.className = 'btn-tag';
        boton.dataset.categoria = tag;
        contenedorFiltros.appendChild(boton);
    });
}
 
// Función para crear la galería de fotos
const crearGaleria = () => {
    contenedorGaleria.innerHTML = '';

    imagenesViajes.forEach(foto => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'tarjeta-foto';
        
        // Guardar la foto en memoria para acceso rápido
        tarjeta.foto = foto;

        const img = document.createElement('img');
        img.src = foto.src;
        img.alt = foto.alt;

        const h3 = document.createElement('h3');
        h3.textContent = foto.title;

        tarjeta.appendChild(img);
        tarjeta.appendChild(h3);

        contenedorGaleria.appendChild(tarjeta);
    });
}
 
// Event listener para los botones de filtro
contenedorFiltros.addEventListener('click', (evento) => {
    const elementoClickeado = evento.target;
 
    if (elementoClickeado.tagName === 'BUTTON') {
        const filtroSeleccionado = elementoClickeado.dataset.categoria;
        console.log("Filtro activo:", filtroSeleccionado);
        
        aplicarFiltro(filtroSeleccionado);
    }
});
 
// Función que muestra las fotos según el filtro
const aplicarFiltro = (tagSeleccionado) => {
    const todasLasTarjetas = document.querySelectorAll('.tarjeta-foto');
    let contador = 0;

    todasLasTarjetas.forEach(tarjeta => {
        const tagsDeEstaFoto = tarjeta.foto.tags;
        const coincide = tagSeleccionado === 'todos' || tagsDeEstaFoto.includes(tagSeleccionado);

        if (coincide) {
            tarjeta.style.display = 'block';
            contador++; 
        } else {
            tarjeta.style.display = 'none';
        }
    });

    actualizarMensaje(contador, tagSeleccionado);
}
 
// Función para actualizar el mensaje según el filtro activo
const actualizarMensaje = (cantidad, etiqueta) => {
    if (etiqueta === 'todos'){
        textoFiltro.textContent = `Estas son todas las fotos.`;
    } else {
        textoFiltro.textContent = `Se han encontrado ${cantidad} fotos de ${etiqueta}`;
    }
}
 
// Inicializar la página
crearBotones();
crearGaleria();