const btnBurger = document.getElementById("burger");
const burgerIcon = document.getElementById("burger-icon");
const menuBurger = document.getElementById("menuBurger");
const modoND = document.getElementById("modo-noc-di");
const favoritos = document.getElementById("favoritos-li");
const misGifos = document.getElementById("mis-gifos");
const crearGif = document.getElementById("btn-crear-gif");
const body= document.getElementById("body");
const logoHome = document.getElementById("logo");
const sectionBuscador = document.getElementById("buscador");
const sectionFav = document.getElementById("favoritos");
const sectionGifos = document.getElementById("mis-gifos-sec");
const sectionCrear = document.getElementById("crear-gifs");
const sectionTrending =document.getElementById("trending");
const camara = document.getElementById("camara");
const rollo = document.getElementById("rollo-de-pelicula");
let cuerpo ="dia";
let over = "no";
let burgerAbierto =false ;

/*modo noche*/
modoND.addEventListener("click",()=>{
   body.classList.toggle('dark');
   if(cuerpo =="dia"){
      modoND.textContent ="MODO DIURNO";
      logoHome.src ="assets/Logo-modo-noc.svg";
      crearGif.src = "assets/CTA-crear-gifo-modo-noc.svg";
      camara.src ="assets/camara-modo-noc.svg" ;
      rollo.src="assets/pelicula-modo-noc.svg";
      modoND.classList.remove("click");
      cuerpo ="noche";
   }else if(cuerpo =="noche"){
      modoND.textContent ="MODO NOCTURNO";
      logoHome.src ="assets/logo-desktop.svg";
      crearGif.src = "assets/button-crear-gifo.svg";
      camara.src ="assets/camara.svg" ;
      rollo.src="assets/pelicula.svg";
      modoND.classList.remove("click");
     cuerpo= "dia";
   }
});
/* menu burger evento */
btnBurger.addEventListener("click", ()=>{
   burgerIcon.classList.toggle("fa-bars");
  burgerIcon.classList.toggle("fa-times");
  menuBurger.classList.toggle("cerrado");
  menuBurger.classList.toggle("abierto");
  burgerAbierto = true
 });
 /*cerrar menu cuando haces click en alguna seccion */
 function cerrarAlClick(elemento){
    elemento.addEventListener("click",()=>{
      burgerIcon.classList.toggle("fa-bars");
      burgerIcon.classList.toggle("fa-times");
      menuBurger.classList.toggle("cerrado");
      menuBurger.classList.toggle("abierto");
    })
 }

 cerrarAlClick(modoND);
 cerrarAlClick(favoritos);
 cerrarAlClick(misGifos);
 
 /*efectos del menu over y out */

 function agregar_evento(elemento,evento){
   if (evento == "mouseover") {
       elemento.addEventListener(evento,()=>{
              elemento.classList.add("efecto");
          });
   }else if (evento == "mouseout") {
      elemento.addEventListener(evento,()=>{
          elemento.classList.remove("efecto");
      });
   }
}
agregar_evento(modoND,"mouseover");
agregar_evento(modoND,"mouseout");
agregar_evento(favoritos,"mouseover");
agregar_evento(favoritos,"mouseout");
agregar_evento(misGifos,"mouseover");
agregar_evento(misGifos,"mouseout");

crearGif.addEventListener("mouseover",()=>{
   if(over == "no"){
   crearGif.src ="./assets/CTA-crear-gifo-hover.svg";      
   }
  });
 
  crearGif.addEventListener("mouseout",()=>{
   if(over == "no"){
   crearGif.src ="./assets/button-crear-gifo.svg";  
   }    
   });

  /*efecto con el mousedown*/



  function mousedown(elemento,funcion,obj1,obj2){
   elemento.addEventListener(funcion,()=>{
      elemento.classList.add("click");
      elemento.classList.remove("efecto");
      obj1.classList.remove("click");
      obj2.classList.remove("click");

      over= "no"
      crearGif.src ="./assets/button-crear-gifo.svg";
   })
}

mousedown(misGifos,"mousedown",modoND,favoritos);
mousedown(favoritos,"mousedown",modoND,misGifos);
mousedown(modoND,"mousedown",favoritos,misGifos);

  crearGif.addEventListener("mousedown",()=>{

   crearGif.src ="./assets/CTA-crear-gifo-active.svg";      
      over= "yes";
      misGifos.classList.remove("click");
      favoritos.classList.remove("click");
      modoND.classList.remove("click");
  });
  logoHome.addEventListener("mousedown",()=>{
   modoND.classList.remove("click");
     misGifos.classList.remove("click");
     crearGif.src ="./assets/button-crear-gifo.svg";
     favoritos.classList.remove("click");
     over="no";
     if(burgerAbierto == true ){
      burgerIcon.classList.add("fa-bars");
      burgerIcon.classList.remove("fa-times");
      menuBurger.classList.add("cerrado");
      menuBurger.classList.remove("abierto");
      burgerAbierto = false;
   }
  });



  /* accion para pasar de seccion a seccion */
  

function click(elemento,obj1,obj2,obj3,obj4){

   elemento.addEventListener("click",()=>{
      obj1.style.display ="block";
      obj2.style.display="none";
      obj3.style.display="none";
      obj4.style.display="none";
     if(elemento == crearGif){
        sectionTrending.style.display="none";
     }else{
      sectionTrending.style.display="block";
     }
     
   })
}

click(logoHome,sectionBuscador,sectionFav,sectionGifos,sectionCrear);
click(favoritos,sectionFav,sectionBuscador,sectionGifos,sectionCrear);
click(misGifos,sectionGifos,sectionBuscador,sectionFav,sectionCrear);
click(crearGif,sectionCrear,sectionBuscador,sectionFav,sectionGifos);
