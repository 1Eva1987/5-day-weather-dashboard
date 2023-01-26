var inputEl = $("#search-input");
var searchBtn = $(".search-button");
var todayEl = $("#today");
var historyEl = $("#history");
var forecast = $("#forecast");

var key = "e5d92f08ca1eeb7ebd94f78928323033";

// Adding background color on search button
searchBtn.attr("style", "background: darkGrey");

// Search Event Listiner
searchBtn.on("click", function (e) {
  e.preventDefault();
  todayEl.empty();
  forecast.empty();
  var locationName = inputEl.val().trim();
  // Create button to hold prev search
  if (inputEl.val()) {
    var historyBtn = $("<button>");
    historyBtn.addClass("history-btn mt-1");
    var locationNameCap =
      locationName.charAt(0).toUpperCase() + locationName.slice(1);
    historyBtn.text(locationNameCap);
    historyEl.append(historyBtn);
    latLon(locationName);
  } else {
    locationName = "London";
    latLon(locationName);
  }
  inputEl.val("");
});

// Function get lat and lon values
function latLon(city) {
  var locationURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=" +
    key;
  $.ajax({
    url: locationURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    lat = response[0].lat;
    console.log(lat);
    lon = response[0].lon;
    console.log(lon);

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
    console.log(baseURL);
    console.log(response);
    var cityName = response.city.name;
    var todayDate = moment().format("DD/MM/YYYY");
    var iconNr = response.list[0].weather[0].icon;
    var urlIcon = "http://openweathermap.org/img/wn/" + iconNr + "@2x.png";
    var windToday = response.list[0].wind.speed;
    var tempToday = (response.list[0].main.temp - 273.15).toFixed(0);
    var humidityToday = response.list[0].main.humidity;
    // Create html elements
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
    todayEl.attr("style", "border: 2px solid black");
    // Weather for comming 5 days
    for (var i = 7; i < response.list.length; i += 8) {
      var divForecast = $("<div>");
      divForecast.addClass("col-2 ml-3 mt-2");
      var h6El = $("<h6>");
      var dateFormat = moment(
        response.list[i].dt_txt.slice(0, 10).trim()
      ).format("DD/MM/YYYY");
      h6El.text(dateFormat);
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
      divForecast.attr("style", "background: darkGrey");
      forecast.append(divForecast);
    }
  });
}

// click event on buttons for previous searches
historyEl.on("click", ".history-btn", function (e) {
  e.preventDefault();
  var elementText = $(e.target).text();
  todayEl.empty();
  forecast.empty();
  latLon(elementText);
});
