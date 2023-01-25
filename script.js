var inputEl = $("#search-input");
var searchBtn = $(".search-button");
var todayEl = $("#today");
var historyEl = $("#history");
var forecast = $("#forecast");

var key = "e5d92f08ca1eeb7ebd94f78928323033";

var locationName = "";

// Search Event Listiner
searchBtn.on("click", function (e) {
  e.preventDefault();
  todayEl.empty();
  forecast.empty();
  var locationName = inputEl.val().trim();
  latLon(locationName);
});

// Function get lat and lon
function latLon(city) {
  // URL to access locations lat and lon
  var locationURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=" +
    key;
  // Getting lat and lon values
  $.ajax({
    url: locationURL,
    method: "GET",
  }).then(function (response) {
    lat = response[0].lat;
    lon = response[0].lon;
    getWeather();
  });
}

// Function get todays weather and 5-day forecast
function getWeather() {
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
    var h4El = $("<h4>");
    h4El.text(cityName + " (" + todayDate + ")");
    var iconImg = $("<img>");
    iconImg.attr("src", urlIcon);
    var pTempEl = $("<p>");
    pTempEl.text("Temp: " + tempToday + "°C");
    var pWindEl = $("<p>");
    pWindEl.text("Wind: " + windToday + " KPH");
    var pHumidityToday = $("<p>");
    pHumidityToday.text("Humidity: " + humidityToday + "%");
    todayEl.append(h4El, iconImg, pTempEl, pWindEl, pHumidityToday);
    // loop over the response list array
    // 40 items for 5 days (40/5 = 8) every 8 element is new day
    // 0 item is today
    for (var i = 7; i < response.list.length; i += 8) {
      console.log(response.list[i]);
      var divForecast = $("<div>");
      divForecast.addClass("col-2");
      //
      var h6El = $("<h6>");
      h6El.text(response.list[i].dt_txt);
      var iconNr = response.list[i].weather[0].icon;
      var urlIcon = "http://openweathermap.org/img/wn/" + iconNr + "@2x.png";
      var iconImg = $("<img>");
      iconImg.attr("src", urlIcon);
      var wind = response.list[i].wind.speed;
      var temp = (response.list[i].main.temp - 273.15).toFixed(0);
      var humidity = response.list[i].main.humidity;
      var pTempEl = $("<p>");
      pTempEl.text("Temp: " + temp + "°C");
      var pWindEl = $("<p>");
      pWindEl.text("Wind: " + wind + " KPH");
      var pHumidity = $("<p>");
      pHumidity.text("Humidity: " + humidity + "%");
      divForecast.append(h6El, iconImg, pTempEl, pWindEl, pHumidity);
      forecast.append(divForecast);
    }
  });
}
