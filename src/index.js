function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${month} ${date} ${hour}:${minutes}`;
}

let dateTime = document.querySelector("#date-time");
let now = new Date();

dateTime.innerHTML = formatDate(now);

function searchCity(city) {
  let apiKey = "34c983dcfcb96cce74bfa8ccc56e5ffe";
  let units = "metric";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  let apiCall = `${apiUrl}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiCall).then(showWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", searchSubmit);

function showWeather(response) {
  let city = response.data.name;
  let country = response.data.sys.country;
  document.querySelector("h2").innerHTML = `${city}, ${country}`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("h3").innerHTML = response.data.weather[0].main;
  celsius = response.data.main.temp;
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let celsius = document.querySelector("a#celsius");
celsius.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector("a#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsius * 9) / 5 + 32;
  let temperature = document.querySelector("#temperature");
  //celsius.classList.remove("active");
  //fahrenheit.classList.add("active");
  temperature.innerHTML = fahrenheitTemperature;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  //celsius.classList.add("active");
  //fahrenheit.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsius);
}

//let celsiusTemperature = null;

function retrieveCurrentPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  let apiCall = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiCall).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveCurrentPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPosition);

searchCity("London");
