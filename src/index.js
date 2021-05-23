let now = new Date();

let currentDate = document.querySelector("#current-date");
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

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
  "Decemeber",
];

let month = months[now.getMonth()];

currentDate.innerHTML = `${day}, ${month} ${date}, ${year} </br> ${hour}:${minute}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let currentCity = document.querySelector("#current-city");
  if (searchInput.value) {
    currentCity.innerHTML = `${searchInput.value}`;
  } else {
    currentCity.innerHTML = null;
    alert("Please enter a city");
  }
  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "cc1073ce88d46b1f446d8312dec62e79";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

let citySearch = document.querySelector("form");
citySearch.addEventListener("submit", search);

function showTemperature(response) {
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${temperature}°`;
}

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "cc1073ce88d46b1f446d8312dec62e79";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#location-button");
button.addEventListener("click", getCurrentPosition);
