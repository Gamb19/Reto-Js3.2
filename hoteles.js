let link = window.location.search;
let linkId = new URLSearchParams(link);
let urlId = linkId.get("id");
console.log(urlId);
const form = document.getElementById("form")

let getHotels = async () => {
  try {
    let hotel = await fetch(
      `https://my-json-server.typicode.com/manuelmebm/testing-hotel-api/hotels?id=${urlId}`
    );
    let dataHotel = await hotel.json();

    dataHotel.forEach((element) => {
      let section = document.getElementById("hoteles");

      let div_Hotel = document.createElement("div");
      div_Hotel.className = "div-hotel";
      let div_img = document.createElement("div");
      div_img.className = "div_img";

      let imagen = document.createElement("img");
      imagen.src = element.thumbnail;
      imagen.className = "img";

      let descrip = document.createElement("div");
      descrip.className = "div-container";

      let titles = document.createElement("a");
      titles.href = `hoteles.html?id=${element.id}`;
      titles.textContent = element.title;
      titles.addEventListener("click", (e) => {
        titleHotel(
          element.id,
          element.rating,
          element.thumbnail,
          element.description,
          element.title
        );
      });

      let textDes = document.createElement("p");
      textDes.textContent = element.description;

      let like = document.createElement("i");
      like.className = "fa-regular fa-heart";

      // Html
      section.insertAdjacentElement("beforeend", div_Hotel);
      div_Hotel.insertAdjacentElement("beforeend", div_img);
      div_img.insertAdjacentElement("beforeend", imagen);
      div_img.insertAdjacentElement("beforeend", like);
      div_Hotel.insertAdjacentElement("beforeend", descrip);
      descrip.insertAdjacentElement("beforeend", titles);
      descrip.insertAdjacentElement("beforeend", textDes);

      let grayStar = 5 - element.rating;
      for (i = 0; i < element.rating; i++) {
        let star = document.createElement("i");
        star.className = "fa-solid fa-star";
        descrip.insertAdjacentElement("beforeend", star);
      }
      for (j = 0; j < grayStar; j++) {
        let star = document.createElement("i");
        star.className = "fa-regular fa-star gray-star";
        descrip.insertAdjacentElement("beforeend", star);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

let getReviews = async () => {
  try {
    let reviews = await fetch(
      `https://my-json-server.typicode.com/manuelmebm/testing-hotel-api/reviews?hotelId=${urlId}`
    );

    let dataReview = await reviews.json();
    let reviewsSec = document.getElementById("reviews");
    dataReview.forEach((element) => {
      let divReview = document.createElement("div");
      divReview.className = "div-review";

      let divContent = document.createElement("div");
      divContent.className = "div-content";

      let titleReview = document.createElement("h2");
      titleReview.textContent = element.title;
      titleReview.className = "title-review";

      let reviewContenedor = document.createElement("p");
      reviewContenedor.textContent = element.description;
      reviewContenedor.className = "review-containt";

      //Reviews por defecto
      reviewsSec.insertAdjacentElement("beforeend", divReview);
      divReview.insertAdjacentElement("beforeend", divContent);
      divContent.insertAdjacentElement("beforeend", titleReview);
      divContent.insertAdjacentElement("beforeend", reviewContenedor);

      //Input reviews

      let grayStar = 5 - element.rating;
      for (i = 0; i < element.rating; i++) {
        let star = document.createElement("i");
        star.className = "fa-solid fa-star";
        divContent.insertAdjacentElement("beforeend", star);
      }
      for (j = 0; j < grayStar; j++) {
        let star = document.createElement("i");
        star.className = "fa-regular fa-star gray-star";
        divContent.insertAdjacentElement("beforeend", star);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

titleHotel = async (hotelRating,hoteldescrip,hotelTitle)=>{
    try{
     let config ={
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Content-type': 'application/json',
         },
         body: JSON.stringify({
             hotelId: urlId,
             hotelRating: hotelRating,
             hoteldescrip:hoteldescrip,
             hotelTitle: hotelTitle,
         })
     }
     let res = await fetch("https://my-json-server.typicode.com/manuelmebm/testing-hotel-api/reviews", config)
      let json = await res.json();
      console.log(json);
      console.log(res)
      if(res.status=== 201){
    let reviewsSec = document.getElementById("reviews");
      let divReview = document.createElement("div");
      divReview.className = "div-review";

      let divContent = document.createElement("div");
      divContent.className = "div-content";

      let titleReview = document.createElement("h2");
      titleReview.textContent = hotelTitle;
      titleReview.className = "title-review";

      let reviewContenedor = document.createElement("p");
      reviewContenedor.textContent = hoteldescrip;
      reviewContenedor.className = "review-containt";

      //Reviews por defecto
      reviewsSec.insertAdjacentElement("beforeend", divReview);
      divReview.insertAdjacentElement("beforeend", divContent);
      divContent.insertAdjacentElement("beforeend", titleReview);
      divContent.insertAdjacentElement("beforeend", reviewContenedor);

      //Input reviews
      if(hotelRating<0){
        hotelRating=0;
        alert("Esta introduciendo un valor menor que 0, su calificacion sera 0")
    }
      let grayStar = 5 - hotelRating;
      
      for (i = 0; i < hotelRating; i++) {
        if (hotelRating>5) {
            hotelRating=5;
            alert("Esta introduciendo un valor mayor que 5, su calificacion sera 5")
        }
        let star = document.createElement("i");
        star.className = "fa-solid fa-star";
        divContent.insertAdjacentElement("beforeend", star);


      }
      for (j = 0; j < grayStar; j++) {
        
        let star = document.createElement("i");
        star.className = "fa-regular fa-star gray-star";
        divContent.insertAdjacentElement("beforeend", star);
      }
      }
    }
    catch(error){
     console.log(error)
    }
    finally{
     
    }
 }


 form.addEventListener("submit", function(event){

    let titleRe= document.getElementById("title").value;
    let reviewOpinion= document.getElementById("review-opinion").value;
    let rating= document.getElementById("rating").value;

    titleHotel(rating,reviewOpinion,titleRe)
    form.reset();



    event.preventDefault();
 })

getHotels();
getReviews();
