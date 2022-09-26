
let hotel;
let dataHotel
let validacion=false;
let hotelPromise = hotel =fetch("https://my-json-server.typicode.com/manuelmebm/testing-hotel-api/hotels")
.then((response)=> response.json())
.then((data)=>{
dataHotel=data;
getHotels();
})
.catch((error)=>{
  console.log(error);
})

function getHotels() {
//creacion html
        dataHotel.forEach(element => {
            let section= document.getElementById("hoteles")

            let div_Hotel = document.createElement("div");
            div_Hotel.className="div-hotel"
            let div_img = document.createElement("div");
            div_img.className="div_img"
      
            let imagen = document.createElement("img")
            imagen.src=element.thumbnail;
            imagen.className='img'

            let descrip = document.createElement("div");
            descrip.className="div-container"
      
            let titles = document.createElement("a");
            titles.href=`hoteles.html?id=${element.id}`
            titles.textContent=element.title;
            titles.addEventListener("click", (e)=> {
               titleHotel(element.id, element.rating, element.thumbnail,element.description, element.title)
              })
      
            let textDes = document.createElement("p");
            textDes.textContent = element.description;

            let buttonBack= document.getElementById("button-back");
            buttonBack.className="button back displays"
            console.log(buttonBack);
            
            let like = document.createElement("i");
            like.className="fa-regular fa-heart"
            like.addEventListener("click", (e)=>{
              likeFunction(like,element.id);
            })
            if (element.like=="likeado") {
              like.className="fa-regular fa-heart red"
            }else{
              like.className="fa-regular fa-heart"
            }

            let buttonLiked=document.getElementById("button");
          
            buttonLiked.addEventListener("click",buttonfilter)
            
            
            
            
      // Html
          section.insertAdjacentElement("beforeend",div_Hotel);
          div_Hotel.insertAdjacentElement("beforeend",div_img);
          div_img.insertAdjacentElement("beforeend",imagen);
          div_img.insertAdjacentElement("beforeend", like);
          div_Hotel.insertAdjacentElement("beforeend",descrip);
          descrip.insertAdjacentElement("beforeend",titles);
          descrip.insertAdjacentElement("beforeend",textDes);

            //logica estrellas
          let grayStar = 5 - element.rating;
            for(i=0; i <  element.rating; i++){
              let star = document.createElement("i");
              star.className="fa-solid fa-star";
              descrip.insertAdjacentElement("beforeend",star);
            }
            for(j=0; j<grayStar; j++){
              let star = document.createElement("i");
              star.className="fa-regular fa-star gray-star";
              descrip.insertAdjacentElement("beforeend",star);
            }
          });
    }
//Corazones
function likeFunction(like,id){

dataHotel.forEach(element=>{
  if(element.id===id){
    if(element.like==="likeado"){
    element.like="deslike"
    like.className="fa-regular fa-heart";
    if(validacion=true){
      buttonfilter();
    }
    }
  else{
    element.like="likeado"
    like.className="fa-regular fa-heart red"
  }
}
})
}

function buttonfilter(){
  validacion=true
  let section= document.getElementById("hoteles")
      section.innerHTML="";
  dataHotel.forEach(element=>{
    if(element.like=="likeado"){
      
            let div_Hotel = document.createElement("div");
            div_Hotel.className="div-hotel"
            let div_img = document.createElement("div");
            div_img.className="div_img"
      
            let imagen = document.createElement("img")
            imagen.src=element.thumbnail;
            imagen.className='img'

            let descrip = document.createElement("div");
            descrip.className="div-container"
      
            let titles = document.createElement("a");
            titles.href=`hoteles.html?id=${element.id}`
            titles.textContent=element.title;
            titles.addEventListener("click", (e)=> {
               titleHotel(element.id, element.rating, element.thumbnail,element.description, element.title)
              })
      
            let textDes = document.createElement("p");
            textDes.textContent = element.description;

            let buttonBack= document.getElementById("button-back");
            buttonBack.className="button back displaysBlock"
            console.log(buttonBack);
            
            
            let like = document.createElement("i");
            like.className="fa-regular fa-heart"
            like.addEventListener("click", (e)=>{
              likeFunction(like,element.id);
            })
            if (element.like=="likeado") {
              like.className="fa-regular fa-heart red"
            }else{
              like.className="fa-regular fa-heart"
            }
            
            let buttonLiked=document.getElementById("button");
            buttonLiked.addEventListener("click",buttonfilter);
            buttonLiked.className="displays";

            
      // Html
          section.insertAdjacentElement("beforeend",div_Hotel);
          div_Hotel.insertAdjacentElement("beforeend",div_img);
          div_img.insertAdjacentElement("beforeend",imagen);
          div_img.insertAdjacentElement("beforeend", like);
          div_Hotel.insertAdjacentElement("beforeend",descrip);
          descrip.insertAdjacentElement("beforeend",titles);
          descrip.insertAdjacentElement("beforeend",textDes);
          

            //logica estrellas
          let grayStar = 5 - element.rating;
            for(i=0; i <  element.rating; i++){
              let star = document.createElement("i");
              star.className="fa-solid fa-star";
              descrip.insertAdjacentElement("beforeend",star);
            }
            for(j=0; j<grayStar; j++){
              let star = document.createElement("i");
              star.className="fa-regular fa-star gray-star";
              descrip.insertAdjacentElement("beforeend",star);
            }
    }
  })
}