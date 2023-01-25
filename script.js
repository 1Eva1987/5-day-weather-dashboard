var inputEl = $("#search-input");
var searchBtn = $(".search-button");
var todayEl = $("#today");
var historyEl = $("#history");

var key = "e5d92f08ca1eeb7ebd94f78928323033";
var lat;
var lon;
var locationName = "";

// Search Event Listiner
searchBtn.on("click", function (e) {
  e.preventDefault();
  todayEl.empty();
  locationName = inputEl.val().trim();
  // URL to access locations lat and lon
  var locationURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    locationName +
    "&limit=5&appid=" +
    key;
  // Getting lat and lon values
  $.ajax({
    url: locationURL,
    method: "GET",
  }).then(function (response) {
    lat = response[0].lat;
    lon = response[0].lon;
    getTodays();
  });
});

// Function get todays weather
function getTodays() {
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
    console.log(response);
    var cityName = response.city.name;
    var todayDate = moment().format("l");
    var iconNr = response.list[0].weather[0].icon;
    var urlIcon = "http://openweathermap.org/img/wn/" + iconNr + "@2x.png";
    var windToday = response.list[0].wind.speed;
    var tempToday = (response.list[0].main.temp - 273.15).toFixed(0);
    var humidityToday = response.list[0].main.humidity;
    // create elements
    var h3El = $("<h4>");
    h3El.text(cityName + " (" + todayDate + ")");
    var iconImg = $("<img>");
    iconImg.attr("src", urlIcon);
    var pTempEl = $("<p>");
    pTempEl.text("Temp: " + tempToday + "°C");
    var pWindEl = $("<p>");
    pWindEl.text("Wind: " + windToday + " KPH");
    var pHumidityToday = $("<p>");
    pHumidityToday.text("Humidity: " + humidityToday + "%");
    todayEl.append(h3El, iconImg, pTempEl, pWindEl, pHumidityToday);
  });
}
