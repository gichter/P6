function httpGet(url) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false); // false for synchronous request
  xmlHttp.send(null);
  const data = JSON.parse(xmlHttp.responseText);
  return data;
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
    "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=8",
    "http://localhost:8000/api/v1/titles/?genre=action&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=History&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=Sci-Fi&page_size=7",
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
    if (data.results.length > 7) {
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
    data.results.forEach(function (object) {
      var item = document.createElement("img");
      item.src = object.image_url;
      item.classList.add("row__poster", "row__posterLarge");
      carousel.appendChild(item);
    });
  });
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
