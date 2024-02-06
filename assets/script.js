// 5 Day Forecast API call:
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// Coordinates generator call:
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// API KEY
// 37827bf3895ac3606010a555012bb2a8

let searchBar = document.querySelector("#searchBar");
let currentCity = document.querySelector("#currentCity");
let cityName = "Atlanta";
let lat = 33.7489924 ;
let lon = -84.3902644;

function setDates() {
    currentCity.textContent = cityName + " (" + dayjs().format("M/D/YYYY") + ")";
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
        lat = data[0].lat;
        lon = data[0].lon;
        currentCity.textContent = data[0].name;
        getWeather();
    })

}

function getWeather() {
    let weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=37827bf3895ac3606010a555012bb2a8&units=imperial";
    let temp = document.querySelector("#temp");
    let wind = document.querySelector("#wind");
    let humidity = document.querySelector("#humidity");

    fetch(weatherURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data.list[0].main.temp);
        temp.textContent = "Temp: " + data.list[0].main.temp + "°F";
        wind.textContent = "Wind: " + data.list[0].wind.speed + " MPH";
        humidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
        currentCity.textContent = data[0].name;
    })
}

let searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", function() {
    getCoords();
});