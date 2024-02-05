// 5 Day Forecast API call:
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// Coordinates generator call:
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// API KEY
// 37827bf3895ac3606010a555012bb2a8

let searchBar = document.querySelector("#searchBar");
let currentCity = document.querySelector("#currentCity");
let thisCity = "Atlanta";

function setDates() {
    currentCity.textContent = thisCity + " (" + dayjs().format("M/D/YYYY") + ")";
    for(i = 0; i < 5; i++) {
        document.querySelector("#day" + [i + 1]).textContent = dayjs().add([i + 1], "day").format("M/D/YYYY");
    }
}

setDates();

// Convert entered city name to coords
function getCoords() {
    let locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchBar.value + "&limit=1&appid=37827bf3895ac3606010a555012bb2a8";
    fetch(locationURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        localStorage.setItem("name", data[0].name);
        localStorage.setItem("lat", data[0].lat);
        localStorage.setItem("lon", data[0].lon);
    })
}

function getWeather() {

    let lat = localStorage.getItem("lat");
    let lon = localStorage.getItem("lon");
    let name = localStorage.getItem("name");
    let weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=37827bf3895ac3606010a555012bb2a8"

    fetch(weatherURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}

let searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", function() {
    getCoords();
    getWeather();
});