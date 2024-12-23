var allCountries = [];

function connect(event) {
  var searchInput = document.getElementById("search-input").value;
  document.getElementById("search-input").value = "";

  var url = `https://restcountries.com/v3.1/name/${encodeURIComponent(
    searchInput
  )}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allCountries = data;
      process(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    });
}

function process(data) {
  var countryContent = document.getElementById("content");
  countryContent.textContent = "";

  for (var i = 0; i < data.length; i++) {
    var country = data[i];
    var countryDiv = document.createElement("div");
    countryDiv.innerHTML = `
            <div class="card">
                <img src="${
                  country.flags.svg
                }" class="card-img-top picture" alt="Flag of ${
      country.name.common
    }">
                <div class="card-body">
                    <h5 class="card-title">${country.name.common}</h5>
                    <p class="card-text"><strong>Capital:</strong> ${
                      country.capital ? country.capital[0] : "N/A"
                    }</p>
                    <p class="card-text"><strong>Region:</strong> ${
                      country.region
                    }</p>
                    <p class="card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p class="card-text"><strong>Languages:</strong> ${
                      country.languages
                        ? Object.values(country.languages).join(", ")
                        : "N/A"
                    }</p>
                    <a href="#" class="btn btn-primary" onclick="more(${i})">More Details</a>
                </div>
            </div>
        `;
    countryDiv.classList.add("country");
    countryContent.appendChild(countryDiv);
  }
}

function more(index) {
  var country = allCountries[index];
  var capital = country.capital ? country.capital[0] : "N/A";

  fetch(
    `http://api.weatherapi.com/v1/current.json?key=f03d78dc7ca64810bdd85508240312&q=${encodeURIComponent(
      capital
    )}&aqi=yes`
  )
    .then((res) => res.json())
    .then((weatherData) => {
      showDetails(country, weatherData);
    });
}

function showDetails(country, weather) {
  var countryDiv = document.createElement("div");
  countryDiv.innerHTML = `
      <div class="card">
          <img src="${
            country.flags.svg
          }" class="card-img-top picture" alt="Flag of ${country.name.common}">
          <div class="card-body">
              <h5 class="card-title">${country.name.common}</h5>
              <p class="card-text"><strong>Capital:</strong> ${
                country.capital ? country.capital[0] : "N/A"
              }</p>
               <p class="card-text"><strong>Currency:</strong> ${
                 country.currencies
                   ? Object.values(country.currencies)
                       .map((currency) => currency.name)
                       .join(", ")
                   : "N/A"
               }</p>
              <p class="card-text"><strong>Weather in ${
                country.capital ? country.capital[0] : "N/A"
              }:</strong></p>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Temperature:</strong> ${
                  weather.current.temp_c
                }°C</li>
                <li class="list-group-item"><strong>Condition:</strong> ${
                  weather.current.condition.text
                }</li>
                <li class="list-group-item"><strong>Wind:</strong> ${
                  weather.current.wind_kph
                } kph</li>
                <li class="list-group-item"><strong>Humidity:</strong> ${
                  weather.current.humidity
                }%</li>
              </ul>
          </div>
      </div>
    `;
  document.getElementById("content").innerHTML = "";
  document.getElementById("content").appendChild(countryDiv);
}
