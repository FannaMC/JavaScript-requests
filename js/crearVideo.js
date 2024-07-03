import { conexionAPI } from "./conexionAPI.js";

//capturar el formulario
const formulario = document.querySelector("[data-formulario]");

//funcion encargada de capturar los elementos del formulario que seran enviados al archivo conexionAPI y va a emitir la requisicion POST para guardar esa informacion en archivo db.json
async function crearVideo (evento) {

    evento.preventDefault();

    const titulo = document.querySelector("[data-titulo]").value;
    const url = document.querySelector("[data-url]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    const descripcion = Math.floor(Math.random*10).toString();

    //bloque para capturar y manejar un posible error, mostrando un mensaje de error
    try {
        await conexionAPI.enviarVideo(titulo,descripcion,url,imagen);
        window.location.href="../pages/envio-concluido.html";
    } catch (e) {
        alert(e);
    }
 }

 //se agrego el event listener al formulario para capturar los valores despues de enviar el formulario 
 formulario.addEventListener("submit",evento => crearVideo(evento));