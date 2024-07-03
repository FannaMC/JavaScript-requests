//se importo la funcion de la API, se establecio la conexion con la API
import { conexionAPI } from "./conexionAPI.js";

// data-lista se encuentra en el index
const lista = document.querySelector("[data-lista]");

//la funcion crearCard fue creada para generar otros elementos de la lista en el archivo index.html
export default function crearCard (titulo,descripcion,url,imagen) {
    const video = document.createElement("li");
    video.className = "videos__item";

    video.innerHTML = `<iframe width="100%" height="72%" src="${url}"
    title="${titulo}" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
    <div class="descripcion-video">
        <img src="${imagen}" alt="logo canal alura">
        <h3>${titulo}</h3>
        <p>${descripcion}</p>
    </div>`;

    return video;
}

//esta funcion retorna los valores de nuentra API en el archivo db.json
async function listarVideos () {
    try {
        const listaAPI = await conexionAPI.listarVideos()

        //se utilizo foreach para recorrer cada item de la lista de la API y anexarlos como hijos del elemento de lista en el index
        listaAPI.forEach(element=>lista.appendChild(crearCard(element.titulo,element.descripcion,element.url,element.imagen)))
    } catch {
        lista.innerHTML=`<h2 class="mensaje__titulo">Ha ocurrido un problema con la conexion :(</h2>`;
    }
}

listarVideos ();