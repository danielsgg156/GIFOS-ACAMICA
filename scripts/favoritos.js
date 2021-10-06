let btnFavorito = document.getElementById("btn-favorito");
let contenedorVacio = document.getElementById("sinContenido");
let contenedorDeFavoritos = document.getElementById("contenedorFavoritos");

let vacio = true;


let i = 0;



let abrir;



  /*saber si hay gifs en favoritos */
  let arrFav =[];

  // if(arrFav.length === 0 ){
  //   contenedorVacio.style.display= "block"
   // }
 
  function asignarFav(elemento,storage,name,id){
   
      elemento.addEventListener("click",e=>{
      e.preventDefault();
       
        let objGif ={
          title: name,
          gif: storage,
          id:id
          }
          let getArr = JSON.parse(localStorage.getItem("gif")|| "[]");
            const favSelected = getArr.find(e=> e.id ===objGif.id);
          console.log(getArr[0]);
          
          console.log(favSelected);
          if(getArr[0]===undefined || getArr[0]===null){
            
            console.log("no hay nada");
            arrFav.push(objGif);
            
            console.log(arrFav);
            localStorage.setItem("gif",JSON.stringify(arrFav));
            asignarFavs();
          }else{
     
              if(
         
                arrFav.id == favSelected
              ){
                console.log("agregar")
                arrFav.push(objGif)
                localStorage.setItem("gif",JSON.stringify(arrFav));
                asignarFavs();
              }else{
                console.log("ya esta")
              }
            
          }

          })
         
    



   
    
      
 

 }
 
 function asignarFavs(){
  
  contenedorDeFavoritos.innerHTML = '';
arrFav = JSON.parse(localStorage.getItem("gif"));
 
 if(arrFav == null) {
   arrFav = [];
 }else{
   
   for(i = 0; i< arrFav.length;i++){
   

           let gifimg = document.createElement('img');
               gifimg.src = `${arrFav[i].gif}`;
        let btnFav = document.createElement("div");
        let btnExpandir = document.createElement("div");
        let btnDescargar = document.createElement("div");
         divMadre = document.createElement("div");
        let divBtn = document.createElement("div");
        let divImg = document.createElement("div");
        let nombreGif = document.createElement("p");
        nombreGif.textContent= `${arrFav[i].title}`
        let btnMovil = document.createElement("div");
        let cerrar =document.createElement("div")
        
         /*atributos y appendchild  mediante una funcion*/
        btnFav.setAttribute("id",`${i}`);
         crearGifs(btnFav, "fas fa-trash btn-gif btnfav", divBtn);
         crearGifs(btnExpandir, "fas fa-expand-alt btn-gif", divBtn);
         crearGifs(btnDescargar, "fas fa-arrow-down btn-gif", divBtn);
         crearGifs(cerrar, "fas fa-times cerrar-btn", divMadre);
         crearGifs(nombreGif, "nombre-gif", divImg);
          crearGifs(divBtn, "contenedor-botones", divMadre);
         crearGifs(btnMovil, "btn-movil", divMadre);
         crearGifs(gifimg,"gifs-favorito",divMadre);
         crearGifs(divImg, "div-img", divMadre);
        crearGifs(divMadre, "tamano-gif", contenedorDeFavoritos);
          
     btnFav.addEventListener("click",(e)=>{

            localStorage.getItem("gif",JSON.stringify(arrFav));    
           arrFav.splice(e.this,1);
            localStorage.setItem("gif",JSON.stringify(arrFav));
            contenedorDeFavoritos.removeChild(divMadre);
            if(arrFav.length!=0){
             asignarFavs() 
          }
          else{
            
              document.querySelector(".contenedorFavoritos").innerHTML="";
          }
            
          })
        
        expandirContraer(btnMovil,gifimg,divMadre,divImg,divBtn,cerrar,btnExpandir,"gifExpandido","gifsTrending","tamano-gif-expandido","tamano-gif","div-img-expan","div-img","contenedor-botones-expandido","contenedor-botones","11","block","hidden");
        expandirContraer(btnExpandir,gifimg,divMadre,divImg,divBtn,cerrar,btnExpandir,"gifExpandido","gifsTrending","tamano-gif-expandido","tamano-gif","div-img-expan","div-img","contenedor-botones-expandido","contenedor-botones","11","block","hidden");
        expandirContraer(cerrar,gifimg,divMadre,divImg,divBtn,cerrar,btnExpandir,"gifsTrending","gifExpandido","tamano-gif","tamano-gif-expandido","div-img","div-img-expand","contenedor-botones","contenedor-botones-expandido","0","none","visible");

        descarga(btnDescargar,gifimg,nombreGif)
        
   }


 }

}

