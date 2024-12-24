// JavaScript for fetching country and displaying data in cards

function connect() {
  var searchTerm = document.getElementById("search-input").value;
  document.getElementById("search-input").value = "";

  var url = `https://restcountries.com/v3.1/name/${searchTerm}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => process(data))
    .catch((error) => console.error("Error fetching country data:", error));
}

function process(data) {
  var allCountries = data;
  console.log(allCountries);
  var oldContent = document.getElementById("content");

  oldContent.textContent = "";
  for (var i = 1; i <= allCountries.length; i++) {
    var country = allCountries[i - 1];

    var newDiv = document.createElement("div");
    newDiv.innerHTML = `
          <div class="card shadow-sm p-3">
              <img src="${
                country.flags.svg
              }" class="card-img-top" alt="Flag of ${country.name.common}">
              <div class="card-body">
                  <h5 class="card-title">${country.name.common}</h5>
                  <p class="card-text">
                      <strong>Capital:</strong> ${
                        country.capital ? country.capital[0] : "N/A"
                      }<br>
                      <strong>Region:</strong> ${country.region}<br>
                      <strong>Population:</strong> ${country.population.toLocaleString()}<br>
                  </p>
                  <button class="btn btn-primary" onclick='showDetails(${
                    i - 1
                  })'>More Details</button>
                  <div class="details mt-3" style="display: none;"></div>
              </div>
          </div>`;

    newDiv.classList.add("col");

    oldContent.appendChild(newDiv);
  }
}

function showDetails(index) {
  var allCountries = JSON.parse(sessionStorage.getItem("countries"));
  var country = allCountries[index];
  var detailsDiv = event.target.nextElementSibling;

  if (detailsDiv.style.display === "none") {
    detailsDiv.style.display = "block";
    detailsDiv.innerHTML = `
          <p><strong>Languages:</strong> ${
            Object.values(country.languages || {}).join(", ") || "N/A"
          }</p>
          <p><strong>Independent:</strong> ${
            country.independent ? "Yes" : "No"
          }</p>
          <p><strong>UN Member:</strong> ${country.unMember ? "Yes" : "No"}</p>
      `;
  } else {
    detailsDiv.style.display = "none";
    detailsDiv.innerHTML = "";
  }
}

// Save country data to session storage
function saveCountries(data) {
  sessionStorage.setItem("countries", JSON.stringify(data));
}

// Update process to save data
function process(data) {
  saveCountries(data);
  var allCountries = data;
  console.log(allCountries);
  var oldContent = document.getElementById("content");

  oldContent.textContent = "";
  for (var i = 1; i <= allCountries.length; i++) {
    var country = allCountries[i - 1];

    var newDiv = document.createElement("div");
    newDiv.innerHTML = `
          <div class="card shadow-sm p-3">
              <img src="${
                country.flags.svg
              }" class="card-img-top" alt="Flag of ${country.name.common}">
              <div class="card-body">
                  <h5 class="card-title">${country.name.common}</h5>
                  <p class="card-text">
                      <strong>Capital:</strong> ${
                        country.capital ? country.capital[0] : "N/A"
                      }<br>
                      <strong>Region:</strong> ${country.region}<br>
                      <strong>Population:</strong> ${country.population.toLocaleString()}<br>
                  </p>
                  <button class="btn btn-primary" onclick='showDetails(${
                    i - 1
                  })'>More Details</button>
                  <div class="details mt-3" style="display: none;"></div>
              </div>
          </div>`;

    newDiv.classList.add("col");

    oldContent.appendChild(newDiv);
  }
}
