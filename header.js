function createHeader() {
  let body = document.body;

  let header = document.createElement("header");

  let logoDiv = document.createElement("div");
  logoDiv.id = "logo";

  let navDiv = document.createElement("div");
  navDiv.id = "nav";

  let nav = document.createElement("nav");

  let menuUl = document.createElement("ul");
  menuUl.id = "menu";

  let menuItems = [
    "dog breeds",
    "search books",
    "specific film",
    "website about countries",
  ];

  menuItems.forEach(function (item) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    menuUl.appendChild(li);
  });

  nav.appendChild(menuUl);

  navDiv.appendChild(nav);

  header.appendChild(logoDiv);
  header.appendChild(navDiv);

  body.appendChild(header);
  addImageToLogo(logoDiv);
}

createHeader();

function addImageToLogo(logoDiv) {
  let imageUrl =
    "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg";

  let img = document.createElement("img");
  img.src = imageUrl;
  img.alt = "logo";

  logoDiv.appendChild(img);
}
