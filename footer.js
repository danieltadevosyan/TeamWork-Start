function createFooter() {
  let body = document.body;

  let footer = document.createElement("footer");

  footer.id = "footer";
  let footText = document.createTextNode("2023 created by Vagrer");
  footer.appendChild(footText);
  body.appendChild(footer);
}

createFooter();
