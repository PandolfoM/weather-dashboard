var apiKey = "de81cbd7917a62a289c2cd964e2ccb23";

var searchCityBtn = document.querySelector("#searchCityBtn");
var selectedCityHeaderEl = document.querySelector("#currentCityHeder");
var tempEl = document.querySelector("#displayTemp");
var windEl = document.querySelector("#displayWind");
var humidityEl = document.querySelector("#displayHumidity");
var uvEl = document.querySelector("#displayUV");

function searchCity(cityName) {
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    "Australia" +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        selectedCityHeaderEl.textContent = data.name;
        tempEl.textContent = data.main.temp + "°F";
        windEl.textContent = data.wind.speed + " MPH";
        humidityEl.textContent = data.main.humidity + "%";
        getAllData(data);
      });
    } else {
      alert("Error: Please enter a valid city");
    }
  });
}

function getAllData(data) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    data.coord.lat +
    "&lon=" +
    data.coord.lon +
    "&units=imperial&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(apiUrl);
        displayData(data);
      });
    }
  });
}

function displayData(data) {
  uvEl.textContent = data.current.uvi;
  uvEl.classList = 'bg-success px-2 rounded text-white uvText';
}

searchCityBtn.addEventListener("click", searchCity);
