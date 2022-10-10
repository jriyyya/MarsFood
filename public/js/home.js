const shorten = (str, len) => {
  return str.length > len ? str.slice(0, len) + "..." : str;
};

function closestMultiple(n, x) {
  if (n==0) {return 0};
  if (x > n) return x;
  n = n + parseInt(x / 2, 10);
  n = n - (n % x);
  return n;
}

// FIlling Header Carousel
document.querySelector("#header-carousel-tag h3").innerText =
  "Most Popular Restaurants";

let headerCarouselCards = document.querySelectorAll(".header-carousel-card");
var i = 0;

cardData = [
  {
    src: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/up0nkshsbvvvxe6bil87",
    title: "lulli cake shop",
    desc: "something something cake very tasty something something very very good haha funny cake good lookking beatuiful",
  },
  {
    src: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/ejzrpy1xhidmt40mdcsw",
    title: "kaka ka chimken",
    desc: "something chicken good very good chicken chicken feel good make you hungry look at image and order we jsut evil evil",
  },
  {
    src: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/xpljc3trbvocjv28v1f4",
    title: "big burger shop",
    desc: "big borger BIG BIG very lazy to write more lalallalalaa",
  },
];

headerCarouselCards.forEach((element) => {
  element.querySelector("img").src = cardData[i].src;
  element.querySelector("h4").innerText = cardData[i].title;
  element.querySelector("p").innerText = "cardData[i].desc";
  i++;
});

//Filling Food Carousel
document.querySelector("#food-carousel-tag h3").innerText =
  "Top Trending Dishes";

//Body
var bodyShowing = 1; // 1->Dishes; 2->Restaurants

function updateBodyShowingButton() {
  let showingOptionsList = ["Dishes", "Restaurants"];
  document.querySelector("#body-title-showing span").innerText =
    showingOptionsList[bodyShowing - 1];
}
updateBodyShowingButton();

//dropdown for showing what
function showBodyShowingDropdown() {
  if (
    document
      .getElementById("body-showing-dropdown-items")
      .classList.contains("show")
  ) {
    document.querySelector(".body-showing-dropdown-button img").style =
      "transform:rotateZ(0deg)";
  } else {
    document.querySelector(".body-showing-dropdown-button img").style =
      "transform:rotateZ(-90deg)";
  }
  document
    .getElementById("body-showing-dropdown-items")
    .classList.toggle("show");
}

// Close dropdown if clicked outsied of it
window.onclick = function (event) {
  if (!event.target.matches("#body-title-showing")) {
    //} || (!event.target.matches('#body-title-showing img'))) {
    var dropdowns = document.getElementsByClassName(
      "body-showing-dropdown-content"
    );
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
        document.querySelector(".body-showing-dropdown-button img").style =
          "transform:rotateZ(0deg)";
      }
    }
  }

  if (
    event.target.matches("#body-title-showing") ||
    event.target.matches("#body-title-showing span") ||
    event.target.matches("#body-title-showing img") ||
    event.target.matches(".body-showing-dropdown-button")
  ) {
    showBodyShowingDropdown();
  }
};

switchBodyShowingButton = (element) => {
  bodyShowing = parseInt(element.id.slice(-1));
  updateBodyShowingButton();
  loadBodyContent();
};

//body
async function fetchRestaurants() {
  data = await fetch(`/api/restaurants/?apiKey=${API_KEY}`);
  parsedData = await data.json();
  return parsedData;
}

async function fetchDishes() {
  data = await fetch(`/api/dishes/?apiKey=${API_KEY}`);
  parsedData = await data.json();
  return parsedData;
}

async function fetchRatings() {
  data = await fetch(`/api/dishes/ratings/?apiKey=${API_KEY}`);
  parsedData = await data.json();
  return parsedData;
}

async function fetchDishData(id) {
  data = await fetch(`/api/dishes/id/${id}/?apiKey=${API_KEY}`);
  parsedData = await data.json();
  return parsedData;
}

var topDishes = [];
var ratings = [];
var bodyData = {
  restaurants: {},
  dishes: {},
};

async function loadData() {
  topDishes = await fetchRatings();
  ratings = await fetchRatings();
  bodyData.dishes = await fetchDishes();
  bodyData.restaurants = await fetchRestaurants();
}

async function loadFoodCarousel() {
  document.querySelector("#food-carousel").innerHTML = "";
  topDishes.sort(function (a, b) {
    return b.rating - a.rating;
  });
  if (topDishes.length > 6) {
    topDishes = topDishes.slice(0, 6);
  }
  var i = 0;
  topDishes.forEach(async (dish) => {
    dish.mypos=i++
    dishid = dish.dish_id;
    dishData = await fetchDishData(dish.dish_id);
    newCard = `<div class="food-carousel-card" id="food-carousel-card${dish.mypos}"
    onclick="location.href='/user/dish/${dish.dish_id}'">
    <div class="vegan-and-image-holder">
    <img class="vegan-indicator" src=${
      "/static/assets/" + (dishData.nonveg ? "nonveg.png" : "veg.png")
    }>
    <img
      class="food-carousel-card-image"
      src="/${dishData.image_url || "static/assets/placeholder_food.jpg"}"
      alt="card-placeholder" onerror="this.style.display='none'"
    />
    </div>
    <h5>${shorten(dishData.name, 20)}</h5>
    <h2>${new Intl.NumberFormat("en-IN", {
      style: "currency",
      notation: "compact",
      currency: "INR",
    }).format(dishData.cost)}</h2>
    <span class="stars-container stars-${closestMultiple(
      dish.rating * (100 / 5),
      5
    )}">★★★★★</span>
  </div>`;
    document.querySelector("#food-carousel").innerHTML += newCard;
  });
}

async function loadBodyContent() {
  document.querySelector(".body-items").innerHTML = "";
  if (bodyShowing == 1) {
    bodyData.dishes.forEach((dish) => {
      restaurantName = bodyData.restaurants.find((item) => {
        return item.restaurant_id == dish.restaurant_id;
      }).name;
      ratingfound = ratings.find((item) => {
        return item.dish_id == dish.dish_id;
      })
      newCard = `<div class="container body-card body-card-dish" 
      onclick="location.href='/user/dish/${dish.dish_id}'">
      <div>
      
        <img class="vegan-indicator" src=${
          "/static/assets/" + (dish.nonveg ? "nonveg.png" : "veg.png")
        }>
        <img class="dish-thumbnail" src="/${dish.image_url}" alt="Dish Image" onerror="this.style.display='none'">
      
        <h3>${shorten(dish.name, 28)}</h3>
        <h2>${new Intl.NumberFormat("en-IN", {
          style: "currency",
          notation: "compact",
          currency: "INR",
        }).format(dish.cost)}</h2>
        <p>${shorten(restaurantName || "", 100)}</p>
      </div>
      <div class="rating-holder">
        <span class="stars-container stars-${closestMultiple(
          ratingfound ? ratingfound.rating*(62/5) : 0,
          5
        )}"></span>
      </div>
      </div>`;
      document.querySelector(".body-items").innerHTML += newCard;
    });
  } else if (bodyShowing == 2) {
    bodyData.restaurants.forEach((restaurant) => {
      newCard = `<div class="container body-card body-card-restaurant">
      ${
        restaurant.image_url
          ? `<img src="${restaurant.image_url}" alt="Restaurant Image">`
          : ""
      }
      <div>  
        <div>
          <h3>${restaurant.name}</h3>
          <span class="stars-container stars-85"></span>
        </div>
        <p>${restaurant.address}</>
      </div>
    </div>`;
      document.querySelector(".body-items").innerHTML += newCard;
    });
  }
}

async function renderData() {
  await loadData();

  await loadFoodCarousel();
  await loadBodyContent();
}
renderData();
