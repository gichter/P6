function httpGet(url) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false); // false for synchronous request
  xmlHttp.send(null);
  const data = JSON.parse(xmlHttp.responseText);
  return data;
}

function slide() {
  console.log("lol");
  document.getElementById("carousel_1").scrollLeft += 50;
}

function createCategoriesMenu() {
  url = "http://localhost:8000/api/v1/genres/?page_size=50";
  menuData = httpGet(url);

  var menu = document.getElementById("categories");

  menuData.results.forEach(function (object) {
    var link = document.createElement("a");
    link.append(document.createTextNode(object.name));
    link.setAttribute(
      "href",
      "http://localhost:8000/api/v1/titles/?page_size=50&genre=" + object.name
    );
    menu.appendChild(link);
  });
}

function loadData() {
  data = httpGet("http://localhost:8000/api/v1/titles/");
  for (var i = 0; i < data.results.length; i++) {
    var newDiv = document.createElement("a");
    var newContent = document.createTextNode(data.results[i].title);
    newDiv.appendChild(newContent);

    var currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
  }
}

function createCarousel() {
  const urls = [
    "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=20",
    "http://localhost:8000/api/v1/titles/?genre=action&page_size=19",
    "http://localhost:8000/api/v1/titles/?genre=History&page_size=19",
    "http://localhost:8000/api/v1/titles/?genre=Sci-Fi&page_size=19",
  ];
  const titles = [
    "Films les mieux notés",
    "Action",
    "Histoire",
    "Science-Fiction",
  ];
  var i = 0;
  urls.forEach(function (url) {
    data = httpGet(url);
    // Banner creation
    if (data.results.length > 19) {
      movieData = httpGet(
        "http://localhost:8000/api/v1/titles/" + data.results[0].id
      );
      banner_title = document.getElementById("banner_title");
      title = document.createTextNode(data.results[0].title);
      banner_title.appendChild(title);
      banner_description = document.getElementById("banner_description");
      description = document.createTextNode(movieData.description);
      banner_description.appendChild(description);

      banner_image = document.getElementById("banner_image");
      banner_image.style.backgroundImage = "url(" + movieData.image_url + ")";

      data.results.shift();
    }
    i++;
    var title = document.getElementById("row_title_" + i);
    t = document.createTextNode(titles[i - 1]);
    title.appendChild(t);
    var carousel = document.getElementById("carousel_" + i);
    // For each movie, add a section in the carousel
    data.results.forEach(function (object) {
      var item = document.createElement("input");
      item.setAttribute("onClick", "openModal(" + object.id + ")");
      item.type = "image";
      item.id = "myBtn";
      item.src = object.image_url;
      item.classList.add("row__poster", "row__posterLarge");
      carousel.appendChild(item);
    });
  });

  // Get the modal
  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");
  console.log(btn);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
}

function createBanner() {
  url = "http://localhost:8000/api/v1/titles/";
  banner = document.getElementById("banner");
  //console.log(banner);
}

window.onload = function () {
  createBanner();
  createCarousel();
  createCategoriesMenu();
};

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  console.log("ping");
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  console.log("ok");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function openModal(movieId) {
  reset_modal = document.getElementById("modal-text");
  while (reset_modal.firstChild) {
    reset_modal.removeChild(reset_modal.lastChild);
    console.log(reset_modal);
  }
  movieData = httpGet("http://localhost:8000/api/v1/titles/" + movieId);
  console.log(movieData);

  var title = document.createElement("h1");
  title.id = "modal-title";
  title.appendChild(document.createTextNode(movieData.title));

  var description = document.createElement("span");
  description.id = "modal-description";
  description.appendChild(document.createTextNode(movieData.description));

  var genres = document.createElement("span");
  genres.id = "modal-genres";
  genres.appendChild(document.createTextNode("Genres : " + movieData.genres));

  var date = document.createElement("span");
  date.id = "modal-date";
  date.appendChild(
    document.createTextNode("Date de sortie : " + movieData.date_published)
  );

  var rating = document.createElement("span");
  rating.id = "modal-rating";
  rating.appendChild(document.createTextNode(movieData.avg_votes + "/10"));

  var imdb = document.createElement("span");
  imdb.id = "modal-imdb";
  imdb.appendChild(document.createTextNode(movieData.imdb_score + "/10"));

  var director = document.createElement("span");
  director.id = "modal-director";
  director.appendChild(
    document.createTextNode("Réalisateur : " + movieData.directors)
  );

  var actors = document.createElement("span");
  actors.id = "modal-actors";
  actors.appendChild(document.createTextNode("Acteurs : " + movieData.actors));

  var country = document.createElement("span");
  country.id = "modal-country";
  country.appendChild(
    document.createTextNode("Pays d'origine : " + movieData.countries[0])
  );

  var duration = document.createElement("span");
  duration.id = "modal-duration";
  duration.appendChild(
    document.createTextNode(movieData.duration + " minutes")
  );

  var income = document.createElement("span");
  income.id = "modal-income";
  income.appendChild(document.createTextNode(movieData.worldwide_gross_income));

  var modal = document.getElementById("modal-text");
  console.log(modal);
  modal.appendChild(title);
  modal.appendChild(description);
  modal.appendChild(genres);
  modal.appendChild(date);
  modal.appendChild(rating);
  modal.appendChild(imdb);
  modal.appendChild(director);
  modal.appendChild(actors);
  modal.appendChild(country);
  modal.appendChild(duration);
  modal.appendChild(income);

  var modal_image = document.getElementById("modal-image");
  modal_image.style.backgroundImage = "url(" + movieData.image_url + ")";

  var modal_display = document.getElementById("myModal");
  modal_display.style.display = "block";
}

function closeModal() {
  reset_modal = document.getElementById("modal-text");
  while (reset_modal.firstChild) {
    reset_modal.removeChild(reset_modal.lastChild);
    console.log(reset_modal);
  }
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}
