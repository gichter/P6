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
  console.log(menuData);

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
    console.log(data.results[i]);
    var newDiv = document.createElement("a");
    var newContent = document.createTextNode(data.results[i].title);
    newDiv.appendChild(newContent);

    var currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
  }
}

function createCarousel() {
  const genres = ["action", "History", "Sci-Fi"];
  var i = 0;
  genres.forEach(function (genre) {
    url =
      "http://localhost:8000/api/v1/titles/?genre=" + genre + "&page_size=7";
    data = httpGet(url);
    console.log(url);
    i++;
    var carousel = document.getElementById("carousel_" + i);
    console.log(data.results);
    data.results.forEach(function (object) {
      console.log(object.title);
      var item = document.createElement("img");
      item.src = object.image_url;
      item.classList.add("movie_carousel");
      carousel.appendChild(item);
    });
  });
}

window.onload = function () {
  createCarousel();
};
