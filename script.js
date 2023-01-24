var inputEl = $("#search-input");
var searchBtn = $(".search-button");

var key = "e5d92f08ca1eeb7ebd94f78928323033";
var lat;
var lon;
var locationName;

// Get input value when user input city name
searchBtn.on("click", function (e) {
  e.preventDefault();
  locationName = inputEl.val().trim();
  console.log(locationName);
});

// URL to to make an API call to get coordinates by location name
var locationURL =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  locationName +
  "&limit=5&appid=" +
  key;

// Base url with lon and lat
var baseURL =
  " https://api.openweathermap.org/data/2.5/forecast?lat=" +
  lat +
  "&lon=" +
  lon +
  "&appid=" +
  key;
