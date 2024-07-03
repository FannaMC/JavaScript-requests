import { conexionAPI } from "./conexionAPI.js";
import crearCard from "./mostrarVideos.js";

async function filtrarVideo (evento) {
    evento.preventDefault();
    
    //capturar el valor que se encuntra en el imput
    const datosDeBusqueda = document.querySelector("[data-busqueda]").value;
    //estamos haciendo una busqueda en conexion API
    const busqueda = await conexionAPI.buscarVideos(datosDeBusqueda);

    const lista = document.querySelector("[data-lista]");

    //este while elimina todos los elementos y con la busqueda se agrega el elemento resultado de dicha busqueda
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    busqueda.forEach(video=>lista.appendChild(crearCard(video.titulo,video.descripcion,video.url,video.imagen)))

    //condicion para verificar el tamaño de la lista de busqueda y en caso de que sea cero se muestra un mensaje en el elemento lista
    if (busqueda.length==0) {
        lista.innerHTML=`<h2 class="mensaje__titulo">No fueron encontrados elementos para ${datosDeBusqueda}</h2>`;
    }

    //console.log(busqueda);
}

const boton = document.querySelector("[data-boton-busqueda]");

boton.addEventListener("click",evento=>filtrarVideo(evento));

//se obtiene el elemento de entrada (imput) con el id buscar
const inputEle = document.getElementById('buscar');
//el evento event listener se activa cuando se presiona la tecla keyup
inputEle.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  //si el codigo de la tecla es 13 que corresponde a la tecla enter se ejecuta la funcion filtrarVideo
  if (key == 13) {
    filtrarVideo(e)
  }
});