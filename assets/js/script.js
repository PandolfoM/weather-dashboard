var apiKey = "de81cbd7917a62a289c2cd964e2ccb23";

var searchCityBtn = document.querySelector("#searchCityBtn");
var selectedCityHeaderEl = document.querySelector("#currentCityHeder");
var tempEl = document.querySelector("#displayTemp");
var windEl = document.querySelector("#displayWind");
var humidityEl = document.querySelector("#displayHumidity");
var uvEl = document.querySelector("#displayUV");

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
        var month = date.getMonth()+1;
        var day = date.getDate();
        var year = date.getFullYear();
        console.log(date);
        selectedCityHeaderEl.textContent = data.name + " (" + month + '/' + day + '/' + year + ')';

        var apiUrlAll =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&units=imperial&appid=" +
          apiKey;
        fetch(apiUrlAll).then(function (response) {
          response.json().then(function (data) {
            tempEl.textContent = data.current.temp + "°F";
            windEl.textContent = data.current.wind_speed + " MPH";
            humidityEl.textContent = data.current.humidity + "%";
            uvEl.textContent = data.current.uvi;
            uvEl.classList = "bg-success px-2 rounded text-white uvText";
          });
        });
        // getAllData(data);
      });
    } else {
      alert("Error: Please enter a valid city");
    }
  });
}

function getAllData(data) {
  var apiUrlAll =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    data.coord.lat +
    "&lon=" +
    data.coord.lon +
    "&units=imperial&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        uvEl.textContent = data.current.uvi;
        uvEl.classList = "bg-success px-2 rounded text-white uvText";
      });
    }
  });
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
