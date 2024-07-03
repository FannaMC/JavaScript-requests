//archivo ejemplo para explicar cómo consumir una API utilizando json-server

//en esta funcion se utiliza el metodo fetch para realizar una solicitud GET a la url de la API local
async function listarVideos () {
    //usar await antes del fetch se espera a que la promesa de la solicitud se resuelva antes de continuar
    const conexion = await fetch("http://localhost:3001/videos");

    //.jon se utiliza para convertir los datos recibidos en formato JSON legible
    const conexionConvertida = conexion.json();

    //console.log(conexionConvertida);
    return conexionConvertida
}

async function enviarVideo(titulo,descripcion,url,imagen) {
    const conexion = await fetch("http://localhost:3001/videos",{
        //POST se utiliza para enviar datos a la API
        method:"POST",
        //content-type indica que se enviara un archivo json
        headers:{"Content-type":"application/json"},
        //con stringify se envian los datos del video
        body:JSON.stringify({
            titulo:titulo,
            descripcion:`${descripcion} mil visualizaciones`,
            url:url,
            imagen:imagen
        })
    })
    const conexionConvertida = conexion.json();

    //condicion para verificar si la conexion fue exitosa
    if (!conexion.ok) {
        throw new Error ("Ha ocurrido un error al enviar el video");
    }

    return conexionConvertida;
}

//funcion para la busqueda y filtrado de los videos
async function buscarVideos(palabraClave) {
    const conexion = await fetch(`http://localhost:3001/videos?q=${palabraClave}`);
    const conexionConvertida = conexion.json();
    return conexionConvertida
}

export const conexionAPI = {
    listarVideos,enviarVideo,buscarVideos
}