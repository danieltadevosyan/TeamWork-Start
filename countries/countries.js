function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("container");
      const homePage = document.getElementById("home-page");
      createHomePage(data, homePage);
    })
    .catch((error) => console.log("Error fetching data:", error));
}

function createHomePage(data, homePage) {
  const filter = document.createElement("div");
  homePage.appendChild(filter);
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search by country name";
  searchInput.addEventListener("input", function () {
    const searchQuery = this.value.toLowerCase();
    const filteredCountries = data.filter((country) => {
      return country.name.common.toLowerCase().includes(searchQuery);
    });
    countriesList.innerHTML = "";
    if (filteredCountries.length === 0) {
      const noCountry = document.createElement("h2");
      countriesList.appendChild(noCountry);
      noCountry.textContent = "No countries found matching the search query.";
    } else {
      depictFlags(filteredCountries, countriesList);
    }
  });
  filter.appendChild(searchInput);

  const regionSelect = document.createElement("select");
  regionSelect.innerHTML = '<option value="All">All</option>';
  const regions = Array.from(new Set(data.map((country) => country.region)));
  regions.forEach((region) => {
    if (region) {
      const option = document.createElement("option");
      option.value = region;
      option.textContent = region;
      regionSelect.appendChild(option);
    }
  });
  regionSelect.addEventListener("change", function () {
    const selectedRegion = this.value;
    const filteredCountries = data.filter((country) =>
      selectedRegion === "All" ? true : country.region === selectedRegion
    );
    countriesList.innerHTML = "";
    depictFlags(filteredCountries, countriesList);
  });
  filter.appendChild(regionSelect);
  const countriesList = document.createElement("div");
  homePage.appendChild(countriesList);
  depictFlags(data, countriesList);
}

function depictFlags(data, homePage) {
  data.forEach((country) => {
    const flagDiv = document.createElement("div");
    flagDiv.classList.add("flag");

    const flagImg = document.createElement("img");
    flagImg.src = country.flags.png;
    flagImg.alt = `${country.name.common} Flag`;

    const countryName = document.createElement("p");
    countryName.textContent = country.name.common;

    flagDiv.appendChild(flagImg);
    flagDiv.appendChild(countryName);

    flagDiv.addEventListener("click", function () {
      const countryPage = document.getElementById("country-page");
      const countryPageDisplay = createCountryPage(country);
      const homePage = document.getElementById("home-page");
      homePage.style.display = "none";
      countryPage.appendChild(countryPageDisplay);
    });

    homePage.appendChild(flagDiv);
  });
}

function createCountryPage(country) {
  const flagDiv = document.createElement("div");
  flagDiv.classList.add("flag");
  const flagImg = document.createElement("img");

  const pageContainer = document.createElement("div");
  const countryName = document.createElement("h2");
  const countryCapital = document.createElement("p");
  const countryPopulation = document.createElement("p");
  const countryArea = document.createElement("p");
  const countryBorders = document.createElement("p");
  const countryLanguages = document.createElement("p");
  const backButton = document.createElement("button");

  flagImg.src = country.flags.png;
  flagImg.alt = `${country.name.common} Flag`;
  countryName.textContent = `Country: ${country.name.common}`;
  countryCapital.textContent = `Capital: ${country.capital[0]}`;
  countryPopulation.textContent = `Population: ${country.population}`;
  countryArea.textContent = `Area: ${country.area}`;
  countryBorders.textContent = `Borders: ${
    country.borders ? country.borders.join(", ") : "N/A"
  }`;
  countryLanguages.textContent = `Languages: ${Object.values(
    country.languages
  ).join(", ")}`;
  backButton.textContent = "Back to All Countries";

  flagDiv.appendChild(flagImg);
  pageContainer.appendChild(flagDiv);
  pageContainer.appendChild(countryName);
  pageContainer.appendChild(countryCapital);
  pageContainer.appendChild(countryPopulation);
  pageContainer.appendChild(countryArea);
  pageContainer.appendChild(countryBorders);
  pageContainer.appendChild(countryLanguages);
  pageContainer.appendChild(backButton);

  backButton.addEventListener("click", function () {
    const homePage = document.getElementById("home-page");
    const countryPage = document.getElementById("country-page");
    countryPage.innerHTML = "";
    homePage.style.display = "block";
  });

  return pageContainer;
}

fetchData("https://restcountries.com/v3.1/all");
