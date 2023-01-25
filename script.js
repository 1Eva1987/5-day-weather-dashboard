var inputEl = $("#search-input");
var searchBtn = $(".search-button");

var key = "e5d92f08ca1eeb7ebd94f78928323033";
var lat;
var lon;
var locationName = "";

// Get input value when user input city name
searchBtn.on("click", function (e) {
  e.preventDefault();
  locationName = inputEl.val().trim();
  console.log(locationName);
  // url to access locations lat and lon
  var locationURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    locationName +
    "&limit=5&appid=" +
    key;
  // getting lat and lon values
  $.ajax({
    url: locationURL,
    method: "GET",
  }).then(function (response) {
    lat = response[0].lat;
    lon = response[0].lon;
    console.log(lat);
    console.log(lon);
    //   Base url with lon and lat
    var baseURL =
      " https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      key;
    $.ajax({
      url: baseURL,
      method: "GET",
    }).then(function (response) {
      console.log(baseURL);
      console.log(response);
      console.log(response.city.name);
      console.log(response.list[0].dt_txt);
      console.log(response.list[0].weather[0].icon);
      console.log("Wind: " + response.list[0].wind.speed + " KPH");
      console.log(
        "Temp: " + (response.list[0].main.temp - 273.15).toFixed(0) + " C"
      );
      console.log("Humidity: " + response.list[0].main.humidity + " %");
    });
  });
});
