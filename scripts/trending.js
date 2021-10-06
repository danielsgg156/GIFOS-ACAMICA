
 

const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");
const carrusel = document.getElementById("carrusel");
const carruselTrending = document.getElementById("carrusel-trending");

let direction;

function overOut(elemento,evento){
    if (evento == "mouseover") {
        elemento.addEventListener(evento,()=>{
               elemento.classList.add("efecto-flechas");
           });
    }else if (evento == "mouseout") {
       elemento.addEventListener(evento,()=>{
           elemento.classList.remove("efecto-flechas");
       });
    }
}
overOut(anterior,"mouseover");
overOut(anterior,"mouseout");
overOut(siguiente,"mouseout");
overOut(siguiente,"mouseover");

/*carrusel*/
/*flechas*/
siguiente.addEventListener("click",()=>{
    carrusel.scrollLeft +=400;

})

anterior.addEventListener("click",()=>{
    carrusel.scrollLeft -= 400;
})

/*trae del api */
    let limit =45;
    
 const urlTrending =`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`

    fetch(urlTrending)
    .then(res=> res.json())
    .then(function(json){
           
      
        json.data.forEach(function(obj){
            
            
            const gifNombre = obj.title;
            const gif = obj.images.original.url;
            let gifs = document.createElement("img");
            let id = obj.id;
            gifs.setAttribute("src", gif);
            gifs.setAttribute("class", "gifs", "id", "gifsOver");
            let btnFav = document.createElement("div");
            let btnExpandir = document.createElement("div");
            let btnDescargar = document.createElement("div");   
            let divMadre = document.createElement("div");
            let divBtn = document.createElement("div");
            let divImg = document.createElement("div");
            let btnMovil = document.createElement("div");
            let nombreGif = document.createElement("div");
            nombreGif.textContent=gifNombre;
            let cerrar =document.createElement("div");
            
            
          /*atributos y appendchild  mediante una funcion*/
          
          crearGifs(btnFav, "far fa-heart btn-gif", divBtn);
          crearGifs(btnExpandir, "fas fa-expand-alt btn-gif", divBtn);
          crearGifs(btnDescargar, "fas fa-arrow-down btn-gif", divBtn);
          crearGifs(cerrar, "fas fa-times cerrar-btn", divMadre);
          crearGifs(divBtn, "contenedor-botones", divImg);
          crearGifs(nombreGif, "nombre-gif", divImg);
          crearGifs(btnMovil, "btn-movil", divMadre);
          divMadre.appendChild(gifs);
          crearGifs(divImg,"div-img", divMadre);
          crearGifs(divMadre,"tamano-gif", carrusel);
          
            /*evento favorito con local storage */
            asignarFav(btnFav,gif,gifNombre,id)
             /*descarga*/
             asignarFavs()
            descarga(btnDescargar,gifs,nombreGif)
           
           
             /*funcion para expandir y cerrar el gif */

          expandirContraer(btnMovil,gifs,divMadre,divImg,divBtn,cerrar,btnExpandir,"gifExpandido","gifsTrending","tamano-gif-expandido","tamano-gif","div-img-expan","div-img","contenedor-botones-expandido","contenedor-botones","11","block","hidden");
          expandirContraer(btnExpandir,gifs,divMadre,divImg,divBtn,cerrar,btnExpandir,"gifExpandido","gifsTrending","tamano-gif-expandido","tamano-gif","div-img-expan","div-img","contenedor-botones-expandido","contenedor-botones","11","block","hidden");
          expandirContraer(cerrar,gifs,divMadre,divImg,divBtn,cerrar,btnExpandir,"gifsTrending","gifExpandido","tamano-gif","tamano-gif-expandido","div-img","div-img-expand","contenedor-botones","contenedor-botones-expandido","0","none","visible");
                  
        });
          
    })

