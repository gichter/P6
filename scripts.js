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
    // Banner creation
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
    // For each movie, add a section in the carousel
    data.results.forEach(function (object) {
      var modal = document.createElement("div");
      modal.classList.add("modal");
      modal.id = "myModal";
      modal_content = document.createElement("div");
      modal_content.classList.add("modal-content");

      var close = document.createElement("span");
      close.classList.add("close");
      close.appendChild(document.createTextNode("X"));
      close.setAttribute("onClick", "closeModal()");
      modal_content.appendChild(close);

      var p = document.createElement("p");
      c = document.createTextNode("modal");
      p.appendChild(c);
      modal_content.appendChild(p);
      modal.appendChild(modal_content);
      var content = document.createElement("p");
      content.appendChild(document.createTextNode("Modal content"));
      console.log(modal);
      var item = document.createElement("input");
      item.setAttribute("onClick", "openModal()");
      item.type = "image";
      item.id = "myBtn";
      item.src = object.image_url;
      item.classList.add("row__poster", "row__posterLarge");
      carousel.appendChild(item);
      carousel.appendChild(modal);
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

function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}
