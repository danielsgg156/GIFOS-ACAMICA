
const verMas = document.getElementById("btn-ver-mas");
const btnBuscador = document.getElementById("btn-buscar");
const btnIcon = document.getElementById("btn-icon");
const btnBuscadorDerecha = document.getElementById("btn-buscar-derecha");
const input = document.getElementById("input-buscador");
const sugerencia = document.getElementById("sugerencia");
const topicos = document.getElementById("trending-topics");
const h2Resultado = document.getElementById("titulo-resultado");
const linea = document.getElementById("linea");
const contenedor = document.getElementById("contenedor-gifs");
const contenedorM = document.getElementById("contenedormain");
const btnVerMas = document.getElementById("btn-ver-mas");
const searchForm = document.getElementById("form-buscador");
const apiKey = "JTTuSKhX493w24cTE17cNArghwaQot2D";
const sugerenciasContenedor = document.getElementById("contenedor-sug");
const ptopicos = document.getElementById("p-topicos");
let abierto = false;
let offset = 0;
let limite = 12;

/*vermas efecto over/out */

verMas.addEventListener("mouseover", () => {
  verMas.classList.add("efecto-vermas");
});
verMas.addEventListener("mouseout", () => {
  verMas.classList.remove("efecto-vermas");
});


/*funcion vaciar el input y el contenedor de gifs */
   


function togleBuscador(elemento, remove, add, visibilidad) {
  elemento.addEventListener("click", () => {
    btnIcon.classList.remove(remove);
    btnIcon.classList.add(add);
    btnBuscador.style.display = visibilidad;
  //  abierto = true
  });
}

togleBuscador(input, "fa-search", "fa-times", "block");
togleBuscador(btnBuscadorDerecha, "fa-times", "fa-search", "none");

/*evento al buscar*/
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  
    let valor = input.value;
    sugerenciasContenedor.style.display="none";
    searchForm.style.paddingBottom = "0px";
    searchForm.style.borderRadius= "25px"
    searchForm.style.borderBottom = "1px solid";
    // input.value = "";
  let offset = 0;
  abierto = true;
  buscarGif(valor, offset);
  
 

});

/* btn ver mas*/
verMas.addEventListener("click", (e) => {
  e.preventDefault();
  offset += 12;
  let valor = input.value;

  buscarGif(valor, offset);
});



/*llamar a la api y crear mediante dom el gif y sus atributos */
function buscarGif(link, limite) {
 
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${link}&limit=12&offset=${limite}`;
  fetch(url)
    .then(res => res.json())
    .then(function (json) {
     
      json.data.forEach(function (obj) {
        /*crear los lementos del gif */

       
        const gifNombre = obj.title;
        
       
        const gif = obj.images.original.url;
        let gifs = document.createElement("img");
        gifs.setAttribute("src", gif);
        gifs.setAttribute("class", "gifs", "id", "gifsOver");
        let btnFav = document.createElement("div");
        let btnExpandir = document.createElement("div");
        let btnDescargar = document.createElement("div");
        let divMadre = document.createElement("div");
        let divBtn = document.createElement("div");
        let divImg = document.createElement("div");
        let nombreGif = document.createElement("p");
        nombreGif.textContent=gifNombre;
        let btnMovil = document.createElement("div");
        let cerrar =document.createElement("div")
        
         /*atributos y appendchild  mediante una funcion*/
         crearGifs(btnFav, "far fa-heart btn-gif", divBtn);
         crearGifs(btnExpandir, "fas fa-expand-alt btn-gif", divBtn);
         crearGifs(btnDescargar, "fas fa-arrow-down btn-gif", divBtn);
         crearGifs(cerrar, "fas fa-times cerrar-btn", divMadre);
         crearGifs(nombreGif, "nombre-gif", divImg);
         crearGifs(divBtn, "contenedor-botones", divMadre);
         crearGifs(btnMovil, "btn-movil", divMadre);
         divMadre.appendChild(gifs);
         
         crearGifs(divImg, "div-img", divMadre);
       
         crearGifs(divMadre, "tamano-gif", contenedor);
    
      /*evento favorito con local storage */
          asignarFav(btnFav,gif,gifNombre);
          /*descarga*/
          descarga(btnDescargar,gifs,nombreGif)
        
     /*funcion para expandir y cerrar el gif */

     expandirContraer(btnMovil,gifs,divMadre,divImg,divBtn,cerrar,btnExpandir,"gifExpandido","gifsTrending","tamano-gif-expandido","tamano-gif","div-img-expan","div-img","contenedor-botones-expandido","contenedor-botones","11","block","hidden");
     expandirContraer(btnExpandir,gifs,divMadre,divImg,divBtn,cerrar,btnExpandir,"gifExpandido","gifsTrending","tamano-gif-expandido","tamano-gif","div-img-expan","div-img","contenedor-botones-expandido","contenedor-botones","11","block","hidden");
     expandirContraer(cerrar,gifs,divMadre,divImg,divBtn,cerrar,btnExpandir,"gifsTrending","gifExpandido","tamano-gif","tamano-gif-expandido","div-img","div-img-expand","contenedor-botones","contenedor-botones-expandido","0","none","visible");
  
     /*evento para borrar el contenido del input*/
      if(abierto == true){
      btnBuscadorDerecha.addEventListener("click",()=>{
     
      contenedor.removeChild(divMadre);
       btnVerMas.style.display="none";
       linea.style.display = "none";
       h2Resultado.style.display ="none";
      // abierto = false
      })
     
    
    }
     input.addEventListener("keydown", (event) => {
       if (event.keycode == 08 || event.which === 08) {
         if (abierto == true) {
           input.value = "";
           contenedor.removeChild(divMadre);
           btnVerMas.style.display = "none";
           linea.style.display = "none";
           h2Resultado.style.display = "none";
          //  abierto = false
         }
       }
     });
     
    

    });
  
    })

    .catch(function (err) {
      console.log(err);
    });

    function limpiarHTML() {
      while (resultado.firstChild) {
          resultado.removeChild(resultado.firstChild)
      }
    }

  btnVerMas.style.display = "block";
  linea.style.display = "block";

  /*titulo de lo buscado */
  h2Resultado.style.display ="block";
  h2Resultado.textContent = input.value;
}


/*trending*/

const urlTopics = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}&limit=5&offset=5`;
fetch(urlTopics)
  .then((res) => res.json())
  .then((res2) => {
    let res3 = res2.data;
    for (let i = 0; i <= 4; i++) {
      let pTopicos = document.createElement("p");
      pTopicos.setAttribute("class", "p-topicos", "id", `p-topicos`);
      pTopicos.textContent = res3[i];
      topicos.appendChild(pTopicos);

        pTopicos.addEventListener("click",(e)=>{
        
            e.preventDefault();
            input.value = pTopicos.textContent;

            let valor = input.value;
            let offset = 0;
            buscarGif(valor, offset);
            btnIcon.classList.remove("fa-search");
            btnIcon.classList.add("fa-times");
            btnBuscador.style.display = "block";
            
        })
      
    }
  })
  .catch(function (err) {
    console.log(err.message);
  });

  



/*sugerencias llamadas desde la api*/
const sugerencias = ()=>{
  let valor =input.value;
  sugerenciasContenedor.innerHTML="";

 let sugerencias = fetch(`https://api.giphy.com/v1/tags/related/${valor}?api_key=JTTuSKhX493w24cTE17cNArghwaQot2D&limit=4`)
 .then(res => res.json())
 sugerencias.then(res2 =>{
  
    for(var i = 0;i <res2.data.length; i++){
    
      let lupa = document.createElement("i");
      let texto = document.createElement("p");
      let liContenedor = document.createElement("div");

      texto.textContent = res2.data[i].name;
      crearGifs(lupa,"fas fa-search lupa",liContenedor);
      crearGifs(texto,"texto-sugerencia",liContenedor);
     crearGifs(liContenedor,"li-sugerencias",sugerenciasContenedor)
      

       liContenedor.addEventListener("click",function(e){
          e.preventDefault();
          input.value=texto.textContent;
          sugerenciasContenedor.classList.remove("ul-sug");
          searchForm.style.paddingBottom = "0px";
          let valor = input.value;
          let offset = 0;
          buscarGif(valor, offset);
          sugerenciasContenedor.style.display="none"
          searchForm.style.borderRadius= "25px";
         searchForm.style.borderBottom = "1px solid";
       })

    }
 })
 .catch(err => console.log(err))

 if(valor !== ""){
   sugerenciasContenedor.classList.add("ul-sug");
  
  }else{
    sugerenciasContenedor.classList.remove("ul-sug");
  }
}

/*funcion para mostrar y cerrar la sugerencias */
function cerrarSugerencia(btn, funcion) {
  btn.addEventListener(funcion, () => {
    if (btn == input ) {
      if (event.keycode == 8 || event.which === 8) {
        sugerenciasContenedor.style.display="none";
        searchForm.style.paddingBottom = "0px";
        searchForm.style.borderRadius= "25px"
        searchForm.style.borderBottom = "1px solid";
        input.value = "";

      } else {
        searchForm.style.paddingBottom = "15px";
        searchForm.style.borderBottom = "hidden";
        searchForm.style.borderRadius= "25px 25px 0 0"
        sugerenciasContenedor.style.display="block";
        sugerenciasContenedor.style.height="148px"
      }
    } else if (btn == btnBuscadorDerecha) {
      sugerenciasContenedor.style.display="none";
      searchForm.style.paddingBottom = "0px";
      searchForm.style.borderRadius= "25px";
      searchForm.style.borderBottom = "1px solid";
      input.value = "";
    }
  });
}

input.addEventListener("keyup",()=>{

  sugerencias();
 
})

cerrarSugerencia(btnBuscadorDerecha, "click");
cerrarSugerencia(input, "keydown");

