const pantallaVideo = document.getElementById("grabacion-video");
const iconoCargando = document.getElementById("icono-cargando");
const pSubirGifo = document.getElementById("p-subir-gifo");
const pText = document.getElementById("p-text");
const h2CrearGif = document.getElementById("h2-crear-gif");
const divGrabar = document.getElementById("grabar");
const infoDiv = document.createElement("info");
const btnsGif = document.getElementById("btns-gif");
const gifGrabado = document.getElementById("gifo-grabado");
const paso1 = document.getElementById("parte1");
const paso2 = document.getElementById("parte2");
const paso3 = document.getElementById("parte3");
const contador = document.getElementById("p-contador");
const btnRepetir = document.getElementById("repetir-captura");
const btnComenzar = document.getElementById("btn-comenzar");
const btnGrabar = document.getElementById("btn-grabar");
const btnFinalizar = document.getElementById("btn-finalizar");
const btnSubir = document.getElementById("btn-subir-gifos");
const h2Permiso = document.getElementById("h2-permiso");
const permiso = document.getElementById("p-permiso");
const contenedorMisGifos = document.getElementById("contenedor-gifos");
const sinContenidoMiGif = document.getElementById("sinContenido-migif")
const down = document.getElementById("down");
const link = document.getElementById("link");

let habilitado = false;
let recorder ;
let segundos = "00";
let minutos = "00";
let horas = "00";
let tiempo;
let blob;
let form = new FormData();
let arrMisGifos = [];
let misGifs = localStorage.getItem("Gifos")
let dea;
btnComenzar.addEventListener("click",()=>{
  
    
        h2CrearGif.style.display="none";
        pText.style.display="none"
        btnComenzar.style.display="none";
        h2Permiso.style.display="block";
        permiso.style.display="block";
        
        paso1.style.background="#572EE5";
        paso1.style.color="#ffffff";
navigator.mediaDevices.getUserMedia({audio:false, video:true})
.then((stream)=>{

    console.log(stream);
    pantallaVideo.srcObject = stream;
    pantallaVideo.style.display="block";
    btnGrabar.style.display="block";
    h2Permiso.style.display="none";
        permiso.style.display="none";
        paso2.style.background="#572EE5";
        paso2.style.color="#ffffff";
        paso1.style.background="#ffffff";
        paso1.style.color="#572EE5";
        recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function() {
                 console.log('started');
               },
              });     

}).catch((err)=>console.log(err))
})
 

btnGrabar.addEventListener("click",()=>{
       recorder.startRecording();
       btnGrabar.style.display="none";
       btnFinalizar.style.display="block";
     contador.style.display="block";
     tiempo = setInterval(time,1000);
     
})

btnFinalizar.addEventListener("click",()=>{
        recorder.stopRecording(() => {
		blob = recorder.getBlob();
		gifGrabado.src = URL.createObjectURL(blob);
                gifGrabado.style.display="block"
                pantallaVideo.style.display="none"
		form.append('file', recorder.getBlob(), 'myGif.gif');
		console.log(form.get('file'));

	});
  
        btnFinalizar.style.display="none";
        contador.style.display="none"
        btnRepetir.style.display="block";
        btnSubir.style.display="block"
         clearInterval(tiempo);
        segundos="00";
        minutos ="00";
        horas ="00";
        contador.innerHTML = `${horas}:${minutos}:${segundos}`;
})

btnRepetir.addEventListener("click",()=>{
        pantallaVideo.style.display="block"
        recorder.clearRecordedData();
        gifGrabado.style.display="none"
        navigator.mediaDevices.getUserMedia({audio:false, video:true})
       
.then((stream)=>{
    
    console.log(stream);
    pantallaVideo.srcObject = stream;
    pantallaVideo.style.display="block";
    btnGrabar.style.display="block";
    divGrabar.style.display="none";
    h2Permiso.style.display="none";
        permiso.style.display="none";
        paso2.style.background="#572EE5";
        paso2.style.color="#ffffff";
        paso1.style.background="#ffffff";
        paso1.style.color="#572EE5";
        recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function() {
                 console.log('started');
               },
              });     

}).catch((err)=>console.log(err))

        btnSubir.style.display="none";
        btnGrabar.style.display="block";
        btnRepetir.style.display="none"
        paso2.style.background="#572EE5";
        paso2.style.color="#ffffff";
        paso3.style.background="#ffffff";
         paso3.style.color="#572EE5";
})

/*subir gif a la plataforma */
btnSubir.addEventListener("click",async()=>{
        paso3.style.background="#572EE5";
        paso3.style.color="#ffffff";
        paso2.style.background="#ffffff";
         paso2.style.color="#572EE5";
        info.style.display="flex";
         divGrabar.style.display="block";
  

        const response = await uploadGif(form);
        console.log(response);

        const gifo = await fetchGifById(response.data.id);
        storageMyGifo(gifo.data)
       
        btnsGif.style.display="flex"
        iconoCargando.src="assets/check.svg"
        pSubirGifo.textContent="GIFO subido con éxito"
        let idGifo = gifo.data.id;
        down.addEventListener("click",async function(){
        
                        let blob = await fetch(
                                `https://media.giphy.com/media/${idGifo}/giphy.gif`
                        ).then((img) => img.blob());
                        invokeSaveAsDialog(blob, 'My-Gif.gif');
                
              })
          

              
})





        


async function uploadGif(form) {
        var requestOptions = {
            method: "POST",
            body: form,
            redirect: "follow",
        };
    
        return await fetch(
            `https://upload.giphy.com/v1/gifs?api_key=JTTuSKhX493w24cTE17cNArghwaQot2D`,
            requestOptions
    
        ).then((response) => response.json());
    }
    
    async function fetchGifById(id) {
        console.log(id);
        return await fetch(
            `https://api.giphy.com/v1/gifs/${id}?api_key=JTTuSKhX493w24cTE17cNArghwaQot2D`
        ).then((response) => response.json());
    }
    
    
    let miGif = localStorage.getItem("myGifos");
    miGif = miGif ? JSON.parse(miGif) : [];
    
    function storageMyGifo(gifo) {
        miGif.push(gifo);
        localStorage.setItem("myGifos", JSON.stringify(miGif));
    }






function time(){
        segundos++;

        if(segundos < 10){
        segundos="0"+segundos;
        }
        if(segundos>59){
                segundos="00";
                minutos++;
                if(minutos<10){
                        minutos="0"+minutos;
                }
        }
        if(minutos>59){
                minutos="00";
                horas++;
                if(horas <10){
                        horas="0"+horas;
                }
        }

      
        contador.innerHTML = `${horas}:${minutos}:${segundos}`;
}


misGifos.addEventListener("click",()=>{
migifoss();
})
function migifoss(){
        contenedorMisGifos.innerHTML="";
if (localStorage.getItem('myGifos')) {
        arrMisGifos = JSON.parse(localStorage.getItem('myGifos'));
        console.log(arrMisGifos)
        //createGifos()
    }
 
    if (arrMisGifos.length) {
        console.log(arrMisGifos.length)
       
 
        arrMisGifos.forEach(gif=>{

                let gifimg = document.createElement('img');
                gifimg.src = gif.images.fixed_width.url;
                let btndelete = document.createElement("div");
                let btnExpandir = document.createElement("div");
                let btnDescargar = document.createElement("div");
                divMadre = document.createElement("div");
                let divBtn = document.createElement("div");
                let divImg = document.createElement("div");
                let nombreGif = document.createElement("p");
                let btnMovil = document.createElement("div");
                let cerrar =document.createElement("div")
                
                /*atributos y appendchild  mediante una funcion*/
               
                crearGifs(btndelete, "fas fa-trash btn-gif btnfav", divBtn);
                crearGifs(btnExpandir, "fas fa-expand-alt btn-gif", divBtn);
                crearGifs(btnDescargar, "fas fa-arrow-down btn-gif", divBtn);
                crearGifs(cerrar, "fas fa-times cerrar-btn", divMadre);
                crearGifs(nombreGif, "nombre-gif", divImg);
                crearGifs(divBtn, "contenedor-botones", divMadre);
                crearGifs(btnMovil, "btn-movil", divMadre);
                crearGifs(gifimg,"gifs-favorito",divMadre);
                crearGifs(divImg, "div-img", divMadre);
                crearGifs(divMadre, "tamano-gif", contenedorMisGifos);

                btndelete.addEventListener("click",(e)=>{
                        localStorage.getItem("myGifos",JSON.stringify(arrMisGifos));
                        arrMisGifos.splice(e.this,1)
                        localStorage.setItem("myGifos",JSON.stringify(arrMisGifos));       
                        contenedorMisGifos.removeChild(divMadre);
                        if(arrMisGifos.length!=0){
                              migifoss();
                        }
                        else{
                                 document.querySelector(".contendor-gifos").innerHTML="";
                        }
                })       
                
        expandirContraer(btnMovil,gifimg,divMadre,divImg,divBtn,cerrar,btnExpandir,"gifExpandido","gifsTrending","tamano-gif-expandido","tamano-gif","div-img-expan","div-img","contenedor-botones-expandido","contenedor-botones","11","block","hidden");
        expandirContraer(btnExpandir,gifimg,divMadre,divImg,divBtn,cerrar,btnExpandir,"gifExpandido","gifsTrending","tamano-gif-expandido","tamano-gif","div-img-expan","div-img","contenedor-botones-expandido","contenedor-botones","11","block","hidden");
        expandirContraer(cerrar,gifimg,divMadre,divImg,divBtn,cerrar,btnExpandir,"gifsTrending","gifExpandido","tamano-gif","tamano-gif-expandido","div-img","div-img-expand","contenedor-botones","contenedor-botones-expandido","0","none","visible");

        descarga(btnDescargar,gifimg,nombreGif)
       
        
        })
       
    }
}