var searchCityBtn = document.querySelector("#searchCityBtn");
var selectedCityHeaderEl = document.querySelector("#currentCityHeder");

function searchCity(cityName) {
  var apiKey = "de81cbd7917a62a289c2cd964e2ccb23";
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    "rocky hill" +
    "&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data);
      });
    }else{
      alert('Error: Please enter a valid city');
    }
  });
}

function displayWeather(city) {
  selectedCityHeaderEl.textContent = city.name;
}

searchCityBtn.addEventListener("click", searchCity);
