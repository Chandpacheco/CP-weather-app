function formatDate(date) {
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentDate = date.getDay();
  let currentMonthNum = date.getMonth();
  let currentMonth = months[date.getMonth()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;
  return formattedDate;
}

function searching(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input");
  let locationHeading = document.querySelector("#location-name");
  locationHeading.innerHTML = `${city.value}`;
  let apiKey = "627c6f2c2be9acd5320a6d4d29514279";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function showTemp(response) {
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = `${temp}`;
  let tempDescription = response.data.weather[0].description;
  let tempDescriptionElement = document.querySelector("#main-temp-description");
  tempDescriptionElement.innerHTML = `${tempDescription}`;
  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.querySelector("#feels-like-element");
  feelsLikeElement.innerHTML = `Feels Like: ${feelsLike}°F`;
  let hi = Math.round(response.data.main.temp_max);
  let lo = Math.round(response.data.main.temp_min);
  let hiElement = document.querySelector("#hi-element");
  let loElement = document.querySelector("#lo-element");
  hiElement.innerHTML = `Hi: ${hi}°`;
  loElement.innerHTML = `Lo: ${lo}°`;
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "627c6f2c2be9acd5320a6d4d29514279";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let date = new Date();
let dailyDate = document.querySelector("#date-time");
dailyDate.innerHTML = formatDate(date);

let searchBar = document.querySelector("#weather-search-form");
searchBar.addEventListener("submit", searching);

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getPosition);
