var apiKey = "de81cbd7917a62a289c2cd964e2ccb23";

var searchCityBtn = document.querySelector("#searchCityBtn");
// top part of data
var selectedCityHeaderEl = document.querySelector("#currentCityHeder");
var tempEl = document.querySelector("#displayTemp");
var windEl = document.querySelector("#displayWind");
var humidityEl = document.querySelector("#displayHumidity");
var uvEl = document.querySelector("#displayUV");
// 5 day forecast
var forecastEl = document.querySelector("#forecast");

var citySearchEl = document.querySelector("#cityInput");

function getCity(cityName) {
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(apiUrl);
        var date = new Date(data.dt * 1000);
        // some reason the month is 1 behind :shrug:
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        selectedCityHeaderEl.textContent =
          data.name + " (" + month + "/" + day + "/" + year + ")";

        var apiUrlAll =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&units=imperial&appid=" +
          apiKey;
        fetch(apiUrlAll).then(function (response) {
          response.json().then(function (data) {
            // display data
            displayData(data);
            // display 5 day forecast
            displayForecast(data);
          });
        });
        // getAllData(data);
      });
    } else {
      alert("Error: Please enter a valid city");
    }
  });
}

function displayData(status) {
  tempEl.textContent = status.current.temp + "°F";
  windEl.textContent = status.current.wind_speed + " MPH";
  humidityEl.textContent = status.current.humidity + "%";
  uvEl.textContent = status.current.uvi;
  uvEl.classList = "bg-success px-2 rounded text-white uvText";
}

function displayForecast(data) {
  for (let i = 0; i < 5; i++) {
    // console.log(data.daily[i].weather[0].icon);
    // date
    var date = new Date(data.daily[i].dt * 1000);
    // some reason the month is 1 behind :shrug:
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    
    var displayForecast = document.createElement("div");
    var forecastHeader = document.createElement("h3");
    var forecastIcon = document.createElement("img");
    var forecastTemp = document.createElement('p');
    var forecastWind = document.createElement('p');
    var forecastHum = document.createElement('p');
    // div
    displayForecast.classList = "col bg-primary whiteText";
    // header
    forecastHeader.textContent = month + "/" + day + "/" + year;
    // icon
    var iconCode = data.daily[i].weather[0].icon;
    var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
    forecastIcon.src = iconUrl;
    forecastIcon.alt = data.daily[i].weather[0].main;
    // temp
    forecastTemp.textContent = data.daily[i].temp.day + " °F";
    // wind
    forecastWind.textContent = data.daily[i].wind_speed + " MPH";
    // humidity
    forecastHum.textContent = data.daily[i].humidity + ' %';
    // append elements
    forecastEl.appendChild(displayForecast);
    displayForecast.appendChild(forecastHeader);
    displayForecast.appendChild(forecastIcon);
    displayForecast.appendChild(forecastTemp);
    displayForecast.appendChild(forecastWind);
    displayForecast.appendChild(forecastHum);
  }
}

function searchCity() {
  var city = citySearchEl.value.trim();
  var cityName = city.split(" ").join("%20");
  if (cityName) {
    getCity(cityName);
  } else {
    alert("Please enter a city");
  }
}

searchCityBtn.addEventListener("click", searchCity);
